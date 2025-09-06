var $=s=>{throw TypeError(s)};var w=(s,t,o)=>t.has(s)||$("Cannot "+o);var n=(s,t,o)=>(w(s,t,"read from private field"),o?o.call(s):t.get(s)),y=(s,t,o)=>t.has(s)?$("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,o),f=(s,t,o,r)=>(w(s,t,"write to private field"),r?r.call(s,o):t.set(s,o),o),b=(s,t,o)=>(w(s,t,"access private method"),o);import{G as M,J as q,ad as S,ae as D,Y as k,A as I,r as g,M as z,Z as F,q as N,s as _}from"./index-COc_9EsS.js";var m,c,a,p,u,v,T,O,K=(O=class extends M{constructor(t,o){super();y(this,u);y(this,m);y(this,c);y(this,a);y(this,p);f(this,m,t),this.setOptions(o),this.bindMethods(),b(this,u,v).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){var r;const o=this.options;this.options=n(this,m).defaultMutationOptions(t),q(this.options,o)||n(this,m).getMutationCache().notify({type:"observerOptionsUpdated",mutation:n(this,a),observer:this}),o!=null&&o.mutationKey&&this.options.mutationKey&&S(o.mutationKey)!==S(this.options.mutationKey)?this.reset():((r=n(this,a))==null?void 0:r.state.status)==="pending"&&n(this,a).setOptions(this.options)}onUnsubscribe(){var t;this.hasListeners()||(t=n(this,a))==null||t.removeObserver(this)}onMutationUpdate(t){b(this,u,v).call(this),b(this,u,T).call(this,t)}getCurrentResult(){return n(this,c)}reset(){var t;(t=n(this,a))==null||t.removeObserver(this),f(this,a,void 0),b(this,u,v).call(this),b(this,u,T).call(this)}mutate(t,o){var r;return f(this,p,o),(r=n(this,a))==null||r.removeObserver(this),f(this,a,n(this,m).getMutationCache().build(n(this,m),this.options)),n(this,a).addObserver(this),n(this,a).execute(t)}},m=new WeakMap,c=new WeakMap,a=new WeakMap,p=new WeakMap,u=new WeakSet,v=function(){var o;const t=((o=n(this,a))==null?void 0:o.state)??D();f(this,c,{...t,isPending:t.status==="pending",isSuccess:t.status==="success",isError:t.status==="error",isIdle:t.status==="idle",mutate:this.mutate,reset:this.reset})},T=function(t){k.batch(()=>{var o,r,e,i,l,d,C,E;if(n(this,p)&&this.hasListeners()){const h=n(this,c).variables,x=n(this,c).context;(t==null?void 0:t.type)==="success"?((r=(o=n(this,p)).onSuccess)==null||r.call(o,t.data,h,x),(i=(e=n(this,p)).onSettled)==null||i.call(e,t.data,null,h,x)):(t==null?void 0:t.type)==="error"&&((d=(l=n(this,p)).onError)==null||d.call(l,t.error,h,x),(E=(C=n(this,p)).onSettled)==null||E.call(C,void 0,t.error,h,x))}this.listeners.forEach(h=>{h(n(this,c))})})},O);function A(s,t){const o=I(),[r]=g.useState(()=>new K(o,s));g.useEffect(()=>{r.setOptions(s)},[r,s]);const e=g.useSyncExternalStore(g.useCallback(l=>r.subscribe(k.batchCalls(l)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),i=g.useCallback((l,d)=>{r.mutate(l,d).catch(z)},[r]);if(e.error&&F(r.options.throwOnError,[e.error]))throw e.error;return{...e,mutate:i,mutateAsync:e.mutate}}const L=()=>{const{toast:s}=N(),t=async e=>{try{console.log("Sending confirmation email for:",e.formType,e);const{data:i,error:l}=await _.functions.invoke("send-noreply-email",{body:{to:e.email,subject:`Thank you for your ${e.formType} submission - Civora Nexus`,html:o(e),formType:e.formType,formData:e}});if(l)return console.error("Email confirmation error:",l),s({title:"Email Warning",description:"Form submitted successfully, but confirmation email may be delayed. Please check your spam folder.",variant:"default"}),null;console.log("Email confirmation sent successfully:",i);try{const{error:d}=await _.from("email_history").insert([{sender_email:"noreply@civoranexus.com",recipient_email:e.email,email_type:"confirmation",subject:`Thank you for your ${e.formType} submission - Civora Nexus`,form_type:e.formType,form_data:e,template_used:e.formType,message_id:(i==null?void 0:i.messageId)||null,provider:(i==null?void 0:i.source)||"brevo",status:"sent"}]);d?console.error("Error storing email history:",d):console.log("Email history stored successfully")}catch(d){console.error("Failed to store email history:",d)}return s({title:"Form Submitted Successfully",description:"Thank you for your submission! A confirmation email has been sent to your email address.",variant:"default"}),i}catch(i){return console.error("Failed to send confirmation email:",i),s({title:"Form Submitted",description:"Your form has been submitted successfully. If you don't receive a confirmation email, please check your spam folder.",variant:"default"}),null}},o=e=>{const i=new Date().toLocaleString(),l=r(e);return`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #007bff; padding-bottom: 20px;">
          <h1 style="color: #007bff; margin: 0; font-size: 28px;">Civora Nexus</h1>
          <p style="color: #666; margin: 5px 0; font-size: 14px;">Innovation • Technology • Solutions</p>
        </div>
        
        <h2 style="color: #333; margin-bottom: 20px;">Thank you for your ${e.formType} submission!</h2>
        
        <p style="margin-bottom: 20px;">Dear ${e.name},</p>
        
        <p style="margin-bottom: 20px;">We have received your ${e.formType} submission and appreciate your interest in Civora Nexus. Our team will review your request and get back to you within 24-48 hours.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Submission Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0;">${e.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;">${e.email}</td></tr>
            ${e.company?`<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0;">${e.company}</td></tr>`:""}
            ${e.phone?`<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${e.phone}</td></tr>`:""}
            ${e.organization?`<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Organization:</td><td style="padding: 8px 0;">${e.organization}</td></tr>`:""}
            ${l}
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Submitted:</td><td style="padding: 8px 0;">${i}</td></tr>
          </table>
        </div>
        
        <p style="margin: 20px 0;">In the meantime, feel free to explore our services and solutions on our website.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://civoranexus.com" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Visit Our Website</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <div style="color: #666; font-size: 14px;">
          <p style="margin-bottom: 15px;"><strong>Civora Nexus</strong><br>
          Email: info@civoranexus.com<br>
          Website: www.civoranexus.com</p>
          
          <p style="font-size: 12px; color: #999; margin: 0;">
            This is an automated confirmation email. Please do not reply to this message.
            If you have any questions, please contact us at info@civoranexus.com
          </p>
        </div>
      </div>
    `},r=e=>{let i="";return e.inquiry_type&&(i+=`<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Inquiry Type:</td><td style="padding: 8px 0;">${e.inquiry_type}</td></tr>`),e.consultation_type&&(i+=`<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Consultation Type:</td><td style="padding: 8px 0;">${e.consultation_type}</td></tr>`),e.investment_type&&(i+=`<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Investment Type:</td><td style="padding: 8px 0;">${e.investment_type}</td></tr>`),e.partnership_type&&(i+=`<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Partnership Type:</td><td style="padding: 8px 0;">${e.partnership_type}</td></tr>`),e.collaboration_type&&(i+=`<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Collaboration Type:</td><td style="padding: 8px 0;">${e.collaboration_type}</td></tr>`),i};return{sendConfirmationEmail:t}};export{A as a,L as u};
