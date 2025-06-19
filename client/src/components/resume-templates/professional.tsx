import { Resume } from "@shared/schema";

interface ProfessionalTemplateProps {
  resume: Resume;
}

export function ProfessionalTemplate({ resume }: ProfessionalTemplateProps) {
  return (
    <div className="professional-template">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 uppercase">{resume.personalInfo.fullName}</h1>
        <p className="text-lg text-gray-700 mt-1">{resume.personalInfo.jobTitle}</p>
        <hr className="my-3 border-gray-300" />
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {resume.personalInfo.email && (
            <div className="flex items-center gap-1">
              <span className="font-semibold">Email:</span> 
              <span>{resume.personalInfo.email}</span>
            </div>
          )}
          {resume.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <span className="font-semibold">Phone:</span> 
              <span>{resume.personalInfo.phone}</span>
            </div>
          )}
          {resume.personalInfo.location && (
            <div className="flex items-center gap-1">
              <span className="font-semibold">Location:</span> 
              <span>{resume.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>
      
      {resume.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase mb-2">Professional Summary</h2>
          <p className="text-gray-700">{resume.personalInfo.summary}</p>
        </div>
      )}
      
      {resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase mb-2">Professional Experience</h2>
          
          {resume.experience.map((exp, index) => (
            <div key={index} className={index < resume.experience.length - 1 ? "mb-5" : ""}>
              <h3 className="font-bold text-gray-800">{exp.title}</h3>
              <div className="flex justify-between items-center my-1">
                <p className="font-semibold text-gray-700">{exp.company}</p>
                <p className="text-sm text-gray-600 italic">{exp.startDate} - {exp.endDate || "Present"}</p>
              </div>
              {exp.location && <p className="text-sm text-gray-600 mb-2">{exp.location}</p>}
              <ul className="list-disc ml-5 text-gray-700">
                {exp.description.split('\n').map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase mb-2">Education</h2>
          
          {resume.education.map((edu, index) => (
            <div key={index} className={index < resume.education.length - 1 ? "mb-3" : ""}>
              <div className="flex justify-between">
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.graduationYear}</p>
              </div>
              <p className="text-gray-700">{edu.institution}</p>
              {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {resume.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 uppercase mb-2">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {resume.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
