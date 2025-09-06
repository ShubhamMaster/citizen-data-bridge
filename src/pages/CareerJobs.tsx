import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Link as LinkIcon, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface Job {
  id: number
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string
  salary_range?: string
  created_at: string
  is_active: boolean
}

interface UploadStatus {
  type: 'file' | 'url' | null
  status: 'idle' | 'uploading' | 'success' | 'error'
  message: string
}

export default function CareerJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [applicantData, setApplicantData] = useState({
    name: '',
    email: '',
    phone: '',
    resumeUrl: ''
  })
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    type: null,
    status: 'idle',
    message: ''
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Fetch jobs from Supabase
  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
      toast({
        title: "Error",
        description: "Failed to load job listings",
        variant: "destructive"
      })
    }
  }

  // Upload file to Tebi S3 via Supabase Edge Function
  const uploadToTebi = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', 'civoranexus-filedata')
    formData.append('folder', 'resumes')

    const response = await fetch('https://xmhglmcbjzrjykgigxxy.functions.supabase.co/upload-tebi', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Failed to upload to Tebi')
    }

    const { url } = await response.json()
    return url
  }

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file) return

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus({
        type: 'file',
        status: 'error',
        message: 'Please upload a PDF or Word document'
      })
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus({
        type: 'file',
        status: 'error',
        message: 'File size must be less than 5MB'
      })
      return
    }

    setUploadStatus({
      type: 'file',
      status: 'uploading',
      message: 'Uploading resume...'
    })

    try {
      const url = await uploadToTebi(file)
      setApplicantData(prev => ({ ...prev, resumeUrl: url }))
      setUploadStatus({
        type: 'file',
        status: 'success',
        message: 'Resume uploaded successfully'
      })
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus({
        type: 'file',
        status: 'error',
        message: 'Failed to upload resume. Please try again.'
      })
    }
  }

  // Handle URL submission
  const handleUrlSubmit = async () => {
    if (!applicantData.resumeUrl.trim()) {
      setUploadStatus({
        type: 'url',
        status: 'error',
        message: 'Please enter a valid resume URL'
      })
      return
    }

    // Validate URL format
    try {
      new URL(applicantData.resumeUrl)
    } catch {
      setUploadStatus({
        type: 'url',
        status: 'error',
        message: 'Please enter a valid URL'
      })
      return
    }

    setUploadStatus({
      type: 'url',
      status: 'uploading',
      message: 'Validating resume URL...'
    })

    try {
      // Validate URL accessibility
      const response = await fetch(applicantData.resumeUrl, { method: 'HEAD' })
      if (!response.ok) {
        throw new Error('URL not accessible')
      }

      setUploadStatus({
        type: 'url',
        status: 'success',
        message: 'Resume URL validated successfully'
      })
    } catch (error) {
      console.error('URL validation error:', error)
      setUploadStatus({
        type: 'url',
        status: 'error',
        message: 'Unable to access the provided URL. Please check and try again.'
      })
    }
  }

  // Submit application
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedJob) {
      toast({
        title: "Error",
        description: "Please select a job position",
        variant: "destructive"
      })
      return
    }

    if (!applicantData.resumeUrl) {
      toast({
        title: "Error",
        description: "Please upload a resume or provide a resume URL",
        variant: "destructive"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          job_id: selectedJob.id,
          application_data: {
            name: applicantData.name,
            email: applicantData.email,
            phone: applicantData.phone
          },
          resume_url: applicantData.resumeUrl,
          status: 'pending'
        })

      if (error) throw error

      toast({
        title: "Success",
        description: "Your application has been submitted successfully!",
      })

      // Reset form
      setApplicantData({ name: '', email: '', phone: '', resumeUrl: '' })
      setSelectedJob(null)
      setUploadStatus({ type: null, status: 'idle', message: '' })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

    } catch (error) {
      console.error('Application submission error:', error)
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      })
    }
  }

  // Load jobs on component mount
  React.useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Career Opportunities</h1>
        <p className="text-muted-foreground">Join our team and help build the future of civic technology</p>
      </div>

      {/* Job Listings */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {jobs.map(job => (
          <Card 
            key={job.id} 
            className={`cursor-pointer transition-all duration-200 ${
              selectedJob?.id === job.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedJob(job)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span>{job.department}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{job.description.substring(0, 150)}...</p>
              {job.salary_range && (
                <p className="text-sm font-medium text-primary">Salary: {job.salary_range}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Form */}
      {selectedJob && (
        <Card>
          <CardHeader>
            <CardTitle>Apply for {selectedJob.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={applicantData.name}
                    onChange={(e) => setApplicantData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicantData.email}
                    onChange={(e) => setApplicantData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={applicantData.phone}
                    onChange={(e) => setApplicantData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              {/* Resume Upload Section */}
              <div className="space-y-4">
                <Label>Resume Upload *</Label>
                
                {/* File Upload Option */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm font-medium">Upload Resume File</span>
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file)
                    }}
                    disabled={uploadStatus.status === 'uploading'}
                  />
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                {/* URL Upload Option */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Or Provide Resume URL</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="https://example.com/your-resume.pdf"
                      value={applicantData.resumeUrl}
                      onChange={(e) => setApplicantData(prev => ({ ...prev, resumeUrl: e.target.value }))}
                      disabled={uploadStatus.status === 'uploading'}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUrlSubmit}
                      disabled={uploadStatus.status === 'uploading'}
                    >
                      Validate
                    </Button>
                  </div>
                </div>

                {/* Upload Status */}
                {uploadStatus.status !== 'idle' && (
                  <Alert variant={uploadStatus.status === 'error' ? 'destructive' : 'default'}>
                    {uploadStatus.status === 'success' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : uploadStatus.status === 'error' ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    <AlertDescription>{uploadStatus.message}</AlertDescription>
                  </Alert>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={uploadStatus.status === 'uploading' || !applicantData.resumeUrl}
              >
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}