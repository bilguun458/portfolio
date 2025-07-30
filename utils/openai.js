const my_kyeyeye = 'kkk';

// Resume content - comprehensive information about Bilguun
const RESUME_CONTENT = `
Bilguun Batnasan - Software Engineer

PROFESSIONAL SUMMARY:
- Passionate Software Engineer based in the USA with over 6 years of experience
- Specializes in designing, building, and optimizing Web/Mobile applications and distributed systems
- Led initiatives to improve system performance, elevate user experience, and enhance engineering productivity
- Work spans across e-commerce, media streaming, and enterprise platforms

WORK EXPERIENCE:
1. Thermo Fisher Scientific Inc (2022-04 to 2025-04)
   - Position: Software Engineer
   - Enterprise-level software development

2. Unimedia Solutions LLC (2018-07 to 2021-07)
   - Position: Software Developer
   - Full-stack development and mobile applications

CORE SKILLS:
- Scalable architecture design
- Full-stack development
- Mobile development
- Performance optimization
- User-centered design
- Clean, maintainable code
- Cross-functional teamwork

TECHNICAL EXPERTISE:
- Web Development: React, Next.js, Node.js, TypeScript
- Mobile Development: React Native, iOS, Android
- Backend: Python, Java, Go, Microservices
- Cloud: AWS, Azure, Docker, Kubernetes
- Databases: PostgreSQL, MongoDB, Redis
- DevOps: CI/CD, Git, Jenkins

PERSONAL BACKGROUND:
- Nature lover at heart who finds deep fulfillment in being outdoors
- Enjoys hiking through scenic trails and time surrounded by trees and mountains
- Strong passion for soft extreme sports including:
  * Mountain Biking
  * Skiing
  * Snowboarding
- These activities fuel creativity, sharpen focus, and provide fresh perspective for work

CONTACT INFORMATION:
- Email: batnasanbilguun29@gmail.com
- Phone: +16418191619
- LinkedIn: https://www.linkedin.com/in/bbatnasan29/
- Facebook: https://www.facebook.com/bilguun1020/
- Instagram: https://instagram.com/bilguun1020/

LOCATION: Based in USA
`;

const SYSTEM_PROMPT = `You are Bilguun Batnasan's AI assistant. You have access to his comprehensive resume and personal information. 

RESUME INFORMATION:
${RESUME_CONTENT}

INSTRUCTIONS:
- Answer questions about Bilguun's experience, skills, background, and contact information
- Be conversational, friendly, and professional
- If asked about something not in the resume, politely redirect to what you do know
- Always represent Bilguun accurately based on the provided information
- Keep responses concise but informative (2-4 sentences typically)
- Use a helpful and approachable tone
- Feel free to mention his passion for nature and outdoor activities when relevant

SPECIFIC RESPONSES:
- "about me" - Share his background as a passionate Software Engineer, his love for nature, and how outdoor activities fuel his creativity
- "experience" - Discuss his 6+ years of experience, his work at Thermo Fisher Scientific and Unimedia Solutions, and his achievements in performance optimization and user experience
- "skills" - List his technical skills (React, Next.js, mobile development, cloud, etc.) and soft skills (architecture design, teamwork, etc.)
- "contact" - Provide his email, phone, and social media links
- "resume" - Offer to share his resume and mention his work experience
- "personal" - Talk about his love for nature, outdoor activities, and how they influence his work

Remember: You're representing Bilguun, so be enthusiastic about his work and personal interests!`;

// Fallback responses when OpenAI API is not available
const FALLBACK_RESPONSES = {
  'about me': "Hi! I'm Bilguun Batnasan, a passionate Software Engineer based in the USA with over 6 years of experience. I love designing and building web/mobile applications, and when I'm not coding, you'll find me outdoors - I'm a nature lover who enjoys mountain biking, skiing, and snowboarding. These activities actually fuel my creativity and give me fresh perspective for my work!",
  
  'experience': "I have over 6 years of experience in software engineering. I've worked at Thermo Fisher Scientific Inc as a Software Engineer (2022-2025) and Unimedia Solutions LLC as a Software Developer (2018-2021). My work spans across e-commerce, media streaming, and enterprise platforms where I've led initiatives to improve system performance and user experience.",
  
  'skills': "My technical skills include React, Next.js, Node.js, TypeScript, mobile development, cloud platforms (AWS, Azure), databases (PostgreSQL, MongoDB), and DevOps practices. I also specialize in scalable architecture design, performance optimization, and user-centered design. I believe in writing clean, maintainable code and working effectively in cross-functional teams.",
  
  'contact': "You can reach me at batnasanbilguun29@gmail.com or call me at +16418191619. I'm also active on LinkedIn (linkedin.com/in/bbatnasan29), Facebook, and Instagram. Feel free to connect with me!",
  
  'resume': "I'd be happy to share my resume! You can download it from my portfolio, or I can tell you about my experience at Thermo Fisher Scientific and Unimedia Solutions, where I've worked on enterprise-level software and full-stack development projects.",
  
  'personal': "Outside of coding, I'm passionate about nature and outdoor activities. I love hiking, mountain biking, skiing, and snowboarding. These activities help me stay creative and focused - I find that time in nature gives me fresh perspectives that I bring back to my work as a software engineer.",
  'hobbies': "I'm a nature lover at heart! When I'm not coding, you'll find me outdoors enjoying activities like mountain biking, skiing, and snowboarding. I believe these outdoor activities fuel my creativity and give me fresh perspectives that I bring into my work. I also enjoy hiking through scenic trails and spending time surrounded by trees and mountains."
};

export async function sendMessageToOpenAI(userMessage) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${my_kyeyeye}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      // Check if it's a quota exceeded error
      if (response.status === 429 || response.status === 402) {
        console.log('OpenAI API quota exceeded, using fallback responses');
        return getFallbackResponse(userMessage);
      }
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return getFallbackResponse(userMessage);
  }
}

function getFallbackResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for specific keywords and return appropriate responses
  if (lowerMessage.includes('about me') || lowerMessage.includes('about you') || lowerMessage.includes('who are you')) {
    return FALLBACK_RESPONSES['about me'];
  } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
    return FALLBACK_RESPONSES['experience'];
  } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
    return FALLBACK_RESPONSES['skills'];
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
    return FALLBACK_RESPONSES['contact'];
  } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
    return FALLBACK_RESPONSES['resume'];
  } else if (lowerMessage.includes('hobbies') || lowerMessage.includes('hobby') || lowerMessage.includes('interests')) {
    return FALLBACK_RESPONSES['hobbies'];
  } else if (lowerMessage.includes('personal') || lowerMessage.includes('nature')) {
    return FALLBACK_RESPONSES['personal'];
  } else {
    return "Hi! I'm Bilguun's AI assistant. I can tell you about his experience, skills, contact information, or personal interests. What would you like to know? You can also contact him directly at batnasanbilguun29@gmail.com.";
  }
} 