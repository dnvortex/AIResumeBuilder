import { Resume } from "@shared/schema";

interface ModernTemplateProps {
  resume: Resume;
}

export function ModernTemplate({ resume }: ModernTemplateProps) {
  return (
    <div className="modern-template">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{resume.personalInfo.fullName}</h1>
        <p className="text-lg text-gray-700">{resume.personalInfo.jobTitle}</p>
        <div className="flex justify-center items-center space-x-3 mt-2 text-sm text-gray-600">
          <span>{resume.personalInfo.email}</span>
          <span>•</span>
          <span>{resume.personalInfo.phone}</span>
          <span>•</span>
          <span>{resume.personalInfo.location}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
        <p className="text-gray-700 text-sm">{resume.personalInfo.summary}</p>
      </div>
      
      {resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Work Experience</h2>
          
          {resume.experience.map((exp, index) => (
            <div key={index} className={index < resume.experience.length - 1 ? "mb-4" : ""}>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800">{exp.title}</h3>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate || "Present"}</span>
              </div>
              <div className="flex justify-between items-start">
                <p className="text-gray-700">{exp.company}</p>
                <span className="text-sm text-gray-600">{exp.location}</span>
              </div>
              <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
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
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Education</h2>
          
          {resume.education.map((edu, index) => (
            <div key={index} className={index < resume.education.length - 1 ? "mb-2" : ""}>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <span className="text-sm text-gray-600">{edu.graduationYear}</span>
              </div>
              <p className="text-gray-700">{edu.institution}</p>
              {edu.description && <p className="text-sm text-gray-600">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {resume.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Skills</h2>
          
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
