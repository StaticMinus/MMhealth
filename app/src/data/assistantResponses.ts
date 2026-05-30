export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  resources?: Resource[];
  showCrisis?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide';
  link: string;
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  query: string;
}

export const suggestedPrompts: SuggestedPrompt[] = [
  { id: '1', label: "I'm feeling anxious", query: "I'm feeling anxious" },
  { id: '2', label: 'Tell me about depression', query: 'Tell me about depression' },
  { id: '3', label: 'How do I manage stress?', query: 'How do I manage stress?' },
  { id: '4', label: 'I need to talk to someone', query: 'I need to talk to someone' },
  { id: '5', label: 'What is the PHQ-9?', query: 'What is the PHQ-9?' },
];

export const responses: Record<string, { content: string; resources?: Resource[]; showCrisis?: boolean }> = {
  'How do I manage stress?': {
    content: `Managing stress is an important skill, and there are several evidence-based techniques that can help:

**Deep Breathing (4-7-8 Technique):**
- Breathe in through your nose for 4 seconds
- Hold your breath for 7 seconds
- Exhale completely through your mouth for 8 seconds
- Repeat 3-4 times

**Progressive Muscle Relaxation:**
- Starting from your toes, tense each muscle group for 5 seconds, then release
- Work your way up through your legs, abdomen, arms, and face

**Mindfulness Meditation:**
- Find a quiet space and focus on your breath
- When thoughts arise, acknowledge them without judgment and return to your breath
- Even 5 minutes daily can make a difference

**Physical Activity:**
- Regular exercise releases endorphins that naturally reduce stress
- A 20-minute walk can significantly lower cortisol levels

**Additional Tips:**
- Maintain a regular sleep schedule
- Limit caffeine and alcohol
- Connect with supportive friends or family
- Take breaks from screens and news

Remember, it's okay to ask for help. If stress feels overwhelming, speaking with a counselor can provide personalized strategies.`,
    resources: [
      {
        id: 'r1',
        title: 'Stress Management Guide',
        description: 'A comprehensive guide to managing stress with practical exercises.',
        type: 'guide',
        link: '/resources',
      },
      {
        id: 'r2',
        title: 'Breathing Exercises Video',
        description: 'Follow-along breathing exercises for anxiety and stress relief.',
        type: 'video',
        link: '/resources',
      },
    ],
  },

  'Tell me about depression': {
    content: `Depression is a common and serious mental health condition that affects how you feel, think, and handle daily activities. It's important to understand that depression is not a sign of weakness — it's a medical condition that can be treated.

**Common symptoms include:**
- Persistent sad, anxious, or "empty" mood
- Loss of interest in activities you once enjoyed
- Changes in appetite or weight
- Difficulty sleeping or oversleeping
- Fatigue or decreased energy
- Feelings of worthlessness or guilt
- Difficulty concentrating or making decisions
- Thoughts of death or suicide

**Types of Depression:**
- Major Depressive Disorder (MDD)
- Persistent Depressive Disorder (Dysthymia)
- Seasonal Affective Disorder (SAD)
- Postpartum Depression

**When to Seek Help:**
If you've been experiencing symptoms for more than two weeks, or they're interfering with your daily life, please reach out to a mental health professional. Treatment options include therapy, medication, or a combination — and they work.

**Immediate Help:**
If you're having thoughts of hurting yourself, please contact our crisis line immediately: **0800-MENTAL-HELP**. You are not alone.`,
    resources: [
      {
        id: 'r3',
        title: 'Understanding Depression',
        description: 'Learn about the causes, symptoms, and treatment options for depression.',
        type: 'article',
        link: '/resources',
      },
      {
        id: 'r4',
        title: 'Depression Self-Care Strategies',
        description: 'Practical daily habits that can help manage depression symptoms.',
        type: 'guide',
        link: '/resources',
      },
    ],
  },

  'I need coping strategies': {
    content: `Here are some effective coping strategies for difficult emotions and situations:

**The 5-4-3-2-1 Grounding Technique (for anxiety):**
- Name 5 things you can see right now
- Name 4 things you can touch or feel
- Name 3 things you can hear
- Name 2 things you can smell
- Name 1 thing you can taste

**Cognitive Reframing:**
- When negative thoughts arise, ask yourself: "Is this thought based on facts?"
- Try to find a more balanced perspective
- Replace "I always fail" with "I'm learning and growing"

**Self-Soothing Activities:**
- Take a warm bath or shower
- Listen to calming music
- Spend time in nature
- Engage in a creative hobby (drawing, writing, cooking)

**Social Connection:**
- Reach out to a trusted friend or family member
- Join a support group
- Sometimes just talking about what you're going through helps

**Journaling:**
- Write down your thoughts and feelings without filtering
- Track patterns in your mood
- Note things you're grateful for each day

**When to Seek Professional Help:**
If coping strategies aren't enough, or your symptoms are worsening, please consider speaking with a counselor. There's strength in seeking support.`,
    resources: [
      {
        id: 'r5',
        title: 'Coping Strategies Workbook',
        description: 'Downloadable workbook with exercises for managing difficult emotions.',
        type: 'guide',
        link: '/resources',
      },
      {
        id: 'r6',
        title: 'Grounding Techniques Video',
        description: 'Visual guide to grounding techniques for anxiety and panic.',
        type: 'video',
        link: '/resources',
      },
    ],
  },

  'How can I improve my sleep?': {
    content: `Good sleep is fundamental to mental health. Here are evidence-based sleep hygiene tips:

**Establish a Routine:**
- Go to bed and wake up at the same time every day (even weekends)
- Create a relaxing bedtime ritual — reading, gentle stretching, or meditation

**Optimize Your Environment:**
- Keep your bedroom cool, dark, and quiet
- Remove electronic devices or use blue light filters
- Consider white noise or calming sounds

**Mind Your Intake:**
- Avoid caffeine after 2 PM
- Limit alcohol — it disrupts REM sleep
- Avoid heavy meals within 2 hours of bedtime

**Daytime Habits:**
- Get exposure to natural light during the day
- Exercise regularly, but not right before bed
- Limit naps to 20-30 minutes, and avoid late afternoon naps

**Worry Management:**
- Keep a "worry journal" — write concerns down before bed
- If you can't sleep after 20 minutes, get up and do something calming until sleepy

If sleep problems persist for more than a few weeks, consider speaking with a healthcare provider as it may indicate an underlying condition.`,
    resources: [
      {
        id: 'r7',
        title: 'Sleep Hygiene Guide',
        description: 'Complete guide to improving your sleep quality.',
        type: 'guide',
        link: '/resources',
      },
    ],
  },

  'Find me a counselor': {
    content: `I'd be happy to help you find professional support. Red Aid Nigeria connects you with qualified mental health professionals across the country.

**How to Find a Counselor:**

1. **Visit our Find Support page** — Browse our directory of verified counselors, psychologists, and therapists
2. **Use filters** — Search by location, specialty, language, and availability
3. **View profiles** — Each counselor has a detailed profile with their qualifications, areas of expertise, and approach
4. **Book directly** — Schedule an appointment through our platform

**Types of Support Available:**
- Individual counseling (in-person and virtual)
- Group therapy sessions
- Crisis support (24/7)
- WhatsApp counseling
- Couples and family therapy

**What to Expect:**
Your first session will typically involve the counselor getting to know you and understanding your concerns. Everything you share is confidential.

**Immediate Support:**
If you need to talk right now, you can also:
- Chat with our team on WhatsApp
- Call our helpline: **0800-MENTAL-HELP**
- Visit a walk-in center near you

Would you like me to guide you to our counselor directory?`,
    resources: [
      {
        id: 'r8',
        title: 'Counselor Directory',
        description: 'Browse qualified mental health professionals near you.',
        type: 'guide',
        link: '/find-support',
      },
    ],
  },

  'I want to hurt myself': {
    content: `I'm really concerned about what you've shared. Your life matters, and there are people who want to help you through this difficult moment.

**Please get immediate help:**

Call our 24/7 Crisis Line: **0800-MENTAL-HELP**

You can also:
- Go to the nearest hospital emergency department
- Call a trusted friend or family member right now
- Use the emergency services: **112**

**Remember:**
- These intense feelings will pass
- You don't have to go through this alone
- Help is available right now
- People care about you and want to support you

**Crisis Resources:**
- Suicide Hotline Nigeria: 0800-MENTAL-HELP
- Emergency Services: 112
- WhatsApp Crisis Chat: Available 24/7

Please reach out now. You deserve support, and there is hope.`,
    showCrisis: true,
  },

  'default': {
    content: `Thank you for sharing that with me. I want you to know that what you're feeling is valid, and it takes courage to open up about your mental health.

I'm here to listen and provide support. While I'm an AI assistant and not a replacement for professional care, I can:

- Help you understand what you might be experiencing
- Share coping strategies and self-care techniques
- Guide you to relevant resources and articles
- Help you find a professional counselor if needed
- Provide information about mental health conditions

**If you're in crisis or having thoughts of hurting yourself, please call our 24/7 helpline: 0800-MENTAL-HELP or dial 112 for emergency services.**

Is there something specific you'd like to talk about or learn more about?`,
  },
};

export function getResponse(query: string): { content: string; resources?: Resource[]; showCrisis?: boolean } {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('stress')) return responses['How do I manage stress?'];
  if (lowerQuery.includes('depression') || lowerQuery.includes('depressed')) return responses['Tell me about depression'];
  if (lowerQuery.includes('coping') || lowerQuery.includes('anxious') || lowerQuery.includes('anxiety')) return responses['I need coping strategies'];
  if (lowerQuery.includes('sleep')) return responses['How can I improve my sleep?'];
  if (lowerQuery.includes('counselor') || lowerQuery.includes('therapist') || lowerQuery.includes('professional') || lowerQuery.includes('someone') || lowerQuery.includes('talk to someone')) return responses['Find me a counselor'];
  if (lowerQuery.includes('hurt') || lowerQuery.includes('kill') || lowerQuery.includes('suicide') || lowerQuery.includes('self-harm') || lowerQuery.includes('die')) return responses['I want to hurt myself'];
  if (lowerQuery.includes('phq') || lowerQuery.includes('assessment') || lowerQuery.includes('screening')) {
    return {
      content: `The PHQ-9 (Patient Health Questionnaire-9) is a widely used screening tool for depression. It consists of 9 questions that help assess the severity of depression symptoms over the past two weeks.

**How it works:**
- Answer 9 simple questions about how you've been feeling
- Each question is scored from 0 (not at all) to 3 (nearly every day)
- Your total score indicates the severity of symptoms

**Score Interpretation:**
- 0-4: Minimal depression
- 5-9: Mild depression
- 10-14: Moderate depression
- 15-19: Moderately severe depression
- 20-27: Severe depression

**Important Notes:**
- The PHQ-9 is a screening tool, not a diagnosis
- A higher score doesn't necessarily mean you have clinical depression
- Always consult a mental health professional for a proper evaluation
- If you score in the moderate to severe range, we strongly recommend speaking with a counselor

You can take the PHQ-9 assessment on our Assessment page. It's completely confidential and takes about 5 minutes.`,
      resources: [
        {
          id: 'r9',
          title: 'Take the PHQ-9 Assessment',
          description: 'Complete a confidential depression screening in just 5 minutes.',
          type: 'guide',
          link: '/assessment',
        },
      ],
    };
  }

  return responses['default'];
}

export const welcomeMessage: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hello! I'm here to support you. You can talk to me about how you're feeling, ask questions about mental health, or get help finding resources.\n\nRemember, I'm an AI assistant — not a replacement for professional care. How are you doing today?",
  timestamp: new Date(),
};
