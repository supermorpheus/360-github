import { createContext, useContext, useState } from 'react'

const OnboardingContext = createContext()

const initialProfileData = {
  // Basic Info
  profilePicture: null,
  profilePicturePreview: null,
  firstName: '',
  middleName: '',
  lastName: '',
  currentOrganization: '',
  currentRole: '',
  inspiringQuote: '',

  // About Section
  introduction: '',
  livesIn: '',
  city: '',
  pincode: '',
  locality: '',
  joyOutsideWork: '',

  // Coordinates/Social
  email: '',
  mobile: '',
  twitter: '',
  instagram: '',
  linkedin: '',
  contentLinks: [],
  otherSocialLinks: [],

  // Life Stories
  lifeStories: {
    earlyLife: {
      inputMethod: null, // 'video', 'audio', 'text'
      videoBlob: null,
      videoUrl: null,
      audioBlob: null,
      audioUrl: null,
      text: '',
      thumbnail: null,
      // Extracted/editable content
      tags: [], // renamed from interests, max 15
      bornIn: '',
      hometown: '',
      schools: [], // { name, location }
      universities: [], // { name, location, course }
      summary: '' // max 100 words
    },
    professional: {
      inputMethod: null,
      videoBlob: null,
      videoUrl: null,
      audioBlob: null,
      audioUrl: null,
      text: '',
      thumbnail: null,
      // Extracted/editable content
      tags: [], // renamed from skills, max 15
      firstJob: null, // { company, titles: [] }
      subsequentJobs: [], // { company, titles: [] }
      summary: '' // max 100 words
    },
    current: {
      inputMethod: null,
      videoBlob: null,
      videoUrl: null,
      audioBlob: null,
      audioUrl: null,
      text: '',
      thumbnail: null,
      // Extracted/editable content
      tags: [], // renamed from interests, max 15
      currentCities: [], // mandatory
      organizations: [], // { name, role } - renamed from rolesOrganizations
      travelCities: [], // optional
      summary: '' // max 100 words
    }
  }
}

// Life story prompts data
export const lifeStoryPrompts = {
  earlyLife: {
    title: 'My Early Life',
    subtitle: 'Jab Main Chhota Baccha Tha! (When I was little…)',
    icon: <img src={`${import.meta.env.BASE_URL}early life final.jpeg`} alt="Early Life" style={{ width: '100px', height: '56px', objectFit: 'cover', objectPosition: 'center center' }} />,
    prompts: [
      'Where you were born, how was it growing up?',
      'Other places you lived in and experienced.',
      'Talk about your family, parents, growing up environment.',
      'School you went to, your friends, what were the things you did together?',
      'What were your interests?',
      'Which university/college did you study in? What years were these?',
      'Anything else from your memory of these times that you would like to share?'
    ]
  },
  professional: {
    title: 'My Mid Life',
    subtitle: 'My first job was awesome / terrible…I moved to a new city…. I got married / broke up…',
    icon: <img src={`${import.meta.env.BASE_URL}mid life final.jpeg`} alt="Mid Life" style={{ width: '100px', height: '56px', objectFit: 'cover', objectPosition: 'center center' }} />,
    introText: 'Share your mid-life journey — the choices you made, the challenges you faced, and how they shaped who you are today:',
    prompts: [
      'Years in your professional journey',
      'Jobs and roles — titles, organisations, duration, locations',
      'Key learnings and experiences that stand out',
      'Personal milestones — family, relationships, life decisions',
      'Challenges you navigated — personally and professionally',
      'Choices that shaped your path — ones you made and ones you didn\'t'
    ],
    highlightText: 'Cover everything except what you are doing right now'
  },
  current: {
    title: 'My Current Life',
    subtitle: "Here & Now, give us the deets! And don't just talk about work…",
    icon: <img src={`${import.meta.env.BASE_URL}current life final.jpeg`} alt="Current Life" style={{ width: '100px', height: '56px', objectFit: 'cover', objectPosition: 'center center' }} />,
    sections: [
      {
        title: 'Personal',
        prompts: ['Location / base, family, friends, areas of interest']
      },
      {
        title: 'Professional',
        prompts: [
          'Name of your current organisation and your work profile',
          'How and when did you start this journey / role?',
          'What work does the organisation do — problems solved via products, solutions, services',
          'Current state — progress in terms of products, customers, revenues, team size',
          'Anything interesting about your organisation / startup, team etc.'
        ]
      }
    ]
  }
}

export function OnboardingProvider({ children }) {
  const [profileData, setProfileData] = useState(initialProfileData)
  const [currentStep, setCurrentStep] = useState(10)

  // Life stories flow state
  const [selectedLifeStory, setSelectedLifeStory] = useState(null) // 'earlyLife', 'professional', 'current'
  const [lifeStorySubStep, setLifeStorySubStep] = useState('selection') // 'selection', 'prompts', 'inputMethod', 'input', 'uploadComplete', 'processing', 'thumbnail', 'confirm1', 'confirm2', 'confirm3', 'confirm4', 'confirm5'

  const totalSteps = 12 // Welcome, Share360, BasicInfo, Professional, Quote, Intro, Location, Joy, Social, Content, LifeStories, Complete

  const updateProfileData = (updates) => {
    setProfileData(prev => ({ ...prev, ...updates }))
  }

  const updateLifeStory = (storyKey, updates) => {
    setProfileData(prev => ({
      ...prev,
      lifeStories: {
        ...prev.lifeStories,
        [storyKey]: {
          ...prev.lifeStories[storyKey],
          ...updates
        }
      }
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const goToStep = (step) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step)
    }
  }

  // Life stories navigation
  const selectLifeStory = (storyKey) => {
    setSelectedLifeStory(storyKey)
    setLifeStorySubStep('prompts')
  }

  const goToInputMethodSelection = () => {
    setLifeStorySubStep('inputMethod')
  }

  const selectInputMethod = (method) => {
    updateLifeStory(selectedLifeStory, { inputMethod: method })
    // For text, skip input and go directly to confirm1 (the form fields)
    if (method === 'text') {
      setLifeStorySubStep('confirm1')
    } else {
      setLifeStorySubStep('input')
    }
  }

  const goToUploadComplete = () => {
    setLifeStorySubStep('processing')
  }

  const goToProcessing = () => {
    setLifeStorySubStep('processing')
  }

  const goToThumbnail = () => {
    setLifeStorySubStep('confirm1')
  }

  const goToConfirmation = () => {
    setLifeStorySubStep('confirm1')
  }

  const goToConfirm2 = () => {
    setLifeStorySubStep('confirm2')
  }

  const goToConfirm3 = () => {
    setLifeStorySubStep('confirm3')
  }

  const goToConfirm4 = () => {
    setLifeStorySubStep('confirm4')
  }

  const goToConfirm5 = () => {
    setLifeStorySubStep('confirm5')
  }

  const backToConfirm1 = () => {
    setLifeStorySubStep('confirm1')
  }

  const backToConfirm2 = () => {
    setLifeStorySubStep('confirm2')
  }

  const backToConfirm3 = () => {
    setLifeStorySubStep('confirm3')
  }

  const backToConfirm4 = () => {
    setLifeStorySubStep('confirm4')
  }

  const backToLifeStorySelection = () => {
    setSelectedLifeStory(null)
    setLifeStorySubStep('selection')
  }

  const backToPrompts = () => {
    setLifeStorySubStep('prompts')
  }

  const backToInputMethod = () => {
    setLifeStorySubStep('inputMethod')
  }

  const backToInput = () => {
    const story = profileData.lifeStories[selectedLifeStory]
    // For text, go back to prompts since input method is now on prompts page
    if (story.inputMethod === 'text') {
      setLifeStorySubStep('prompts')
    } else {
      setLifeStorySubStep('input')
    }
  }

  const backToThumbnail = () => {
    // All input methods go back to prompts (thumbnail is now in confirm1)
    setLifeStorySubStep('prompts')
  }

  const completeLifeStory = () => {
    setSelectedLifeStory(null)
    setLifeStorySubStep('selection')
  }

  const isLifeStoryComplete = (storyKey) => {
    const story = profileData.lifeStories[storyKey]
    // Check if confirmation data exists (summary is filled)
    return story.summary && story.summary.trim().length > 0
  }

  const getCompletionPercentage = () => {
    const fields = [
      profileData.firstName,
      profileData.lastName,
      profileData.currentOrganization,
      profileData.currentRole,
      profileData.inspiringQuote,
      profileData.joyOutsideWork,
      profileData.introduction,
      profileData.locality,
      profileData.city,
      profileData.pincode
    ]

    const filledFields = fields.filter(field => field && field.trim() !== '').length
    return Math.round((filledFields / fields.length) * 100)
  }

  const value = {
    profileData,
    updateProfileData,
    updateLifeStory,
    currentStep,
    setCurrentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    getCompletionPercentage,
    // Life stories
    selectedLifeStory,
    lifeStorySubStep,
    selectLifeStory,
    goToInputMethodSelection,
    selectInputMethod,
    goToUploadComplete,
    goToProcessing,
    goToThumbnail,
    goToConfirmation,
    goToConfirm2,
    goToConfirm3,
    goToConfirm4,
    goToConfirm5,
    backToConfirm1,
    backToConfirm2,
    backToConfirm3,
    backToConfirm4,
    backToLifeStorySelection,
    backToPrompts,
    backToInputMethod,
    backToInput,
    backToThumbnail,
    completeLifeStory,
    isLifeStoryComplete
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
