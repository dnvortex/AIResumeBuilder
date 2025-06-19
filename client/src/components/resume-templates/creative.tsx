import { Resume } from "@shared/schema";

interface CreativeTemplateProps {
  resume: Resume;
}

export function CreativeTemplate({ resume }: CreativeTemplateProps) {
  return (
    <div className="creative-template">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold text-purple-700">{resume.personalInfo.fullName}</h1>
          <p className="text-xl text-gray-600 mt-1">{resume.personalInfo.jobTitle}</p>
          
          {resume.personalInfo.summary && (
            <div className="mt-4">
              <p className="text-gray-700 italic border-l-4 border-purple-400 pl-3">{resume.personalInfo.summary}</p>
            </div>
          )}
        </div>
        
        <div className="md:w-1/3 bg-purple-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">Contact</h2>
          <div className="space-y-2 text-sm">
            {resume.personalInfo.email && (
              <div>
                <span className="font-medium">Email:</span>
                <p>{resume.personalInfo.email}</p>
              </div>
            )}
            {resume.personalInfo.phone && (
              <div>
                <span className="font-medium">Phone:</span>
                <p>{resume.personalInfo.phone}</p>
              </div>
            )}
            {resume.personalInfo.location && (
              <div>
                <span className="font-medium">Location:</span>
                <p>{resume.personalInfo.location}</p>
              </div>
            )}
          </div>
          
          {resume.skills.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-purple-700 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {resume.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 pb-2 border-b-2 border-purple-200">Experience</h2>
          
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-purple-200">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-purple-400 -translate-x-[5px]"></div>
                <h3 className="font-bold text-gray-800 text-lg">{exp.title}</h3>
                <p className="font-medium text-purple-600">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {exp.startDate} - {exp.endDate || "Present"}
                  {exp.location && ` | ${exp.location}`}
                </p>
                <ul className="list-disc ml-4 text-gray-700 text-sm space-y-1">
                  {exp.description.split('\n').map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {resume.education.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-purple-700 mb-4 pb-2 border-b-2 border-purple-200">Education</h2>
          
          <div className="space-y-4">
            {resume.education.map((edu, index) => (
              <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-purple-200">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-purple-400 -translate-x-[5px]"></div>
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-purple-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.graduationYear}</p>
                {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
