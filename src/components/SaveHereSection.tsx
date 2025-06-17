
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const SaveHereSection = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    // Add to bookmarks or local storage
    const pageInfo = {
      title: document.title,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };
    
    const savedPages = JSON.parse(localStorage.getItem('savedPages') || '[]');
    savedPages.push(pageInfo);
    localStorage.setItem('savedPages', JSON.stringify(savedPages));
    
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12 text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookmarkPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Save This Page
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Keep this information handy for future reference. Save to your bookmarks or get in touch with us directly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                onClick={handleSave}
                disabled={isSaved}
                className="btn-primary flex items-center gap-3"
              >
                {isSaved ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Saved!
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-5 h-5" />
                    Save to Bookmarks
                  </>
                )}
              </Button>
              
              <Button className="btn-secondary" asChild>
                <a href="mailto:contact@civoranexus.com" className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </Button>
            </div>

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-primary">Email</div>
                  <div className="text-sm text-muted-foreground">contact@civoranexus.com</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-primary">Phone</div>
                  <div className="text-sm text-muted-foreground">+91-9146 2687 10</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-primary">Location</div>
                  <div className="text-sm text-muted-foreground">Sangamner, Maharashtra</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaveHereSection;
