// Mock data for Gang 360 app

export const currentUser = {
  id: 'user-001',
  firstName: 'Anu',
  lastName: 'Grah',
  email: 'anu@supermorpheus.com',
  profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  currentOrganization: 'Super Morpheus',
  currentRole: 'Product Lead',
  livesIn: 'Bengaluru, India',
  introduction: 'Passionate about building products that make a difference. Love connecting with fellow entrepreneurs and sharing ideas. Focused on community-driven growth and meaningful connections.',
  profileCompletion: 88,
  status: 'super',
  joinedDate: '2025-01-15',
  phone: '+91 98765 00001',
  linkedin: 'https://linkedin.com/in/anugrah',
  tags: ['Product', 'Community', 'Startup', 'Growth'],
  inspiringQuote: 'The best way to predict the future is to create it.',
  joyOutsideWork: 'Exploring hidden cafes, weekend treks in the Western Ghats, and reading sci-fi novels.',
  videos: {
    earlyLife: { status: 'published', url: 'https://example.com/videos/anu-early.mp4', thumbnail: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=200&h=120&fit=crop' },
    professionalLife: { status: 'published', url: 'https://example.com/videos/anu-professional.mp4', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=120&fit=crop' },
    currentLife: { status: 'under_review', url: 'https://example.com/videos/anu-current.mp4', thumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200&h=120&fit=crop' }
  },
  lifeStories: {
    earlyLife: {
      tags: ['Cricket', 'Video Games', 'Engineering', 'Mathematics', 'Science', 'Biotechnology', 'Life Purpose', 'PCM', 'Analytics', 'Numbers'],
      bornIn: 'New Delhi',
      hometown: 'New Delhi',
      schools: ['New Era Public School, Mayapuri, Delhi'],
      universities: ['NSIT, Delhi'],
      summary: 'Anu grew up in a comfortable middle class family in Delhi. She was always curious about how things work and had a natural affinity for numbers and science. Her early years were filled with cricket matches in the colony, video games, and a deep interest in engineering and mathematics.',
      videoDuration: '10:08'
    },
    professional: {
      tags: ['Biotech', 'Textiles', 'Market Research', 'Data Analytics', 'Tableau', 'Excel', 'Brand Launch', 'Procurement', 'Supply Chain', 'B2B Sales'],
      firstJob: 'Mu Sigma - Analyst',
      subsequentJobs: ['Grail Research - Market Research Analyst', 'Family Business (Industrial Parts Import & B2B Sales) - Operations Manager, Procurement Manager, Branding Specialist', 'Bain And Company - Senior Specialist, Manager, Senior Manager'],
      summary: 'With about 15 years in analytics-driven roles, Anu began after completing her engineering from NSIT. She started as an analyst at Mu Sigma, moved into market research, helped grow the family business, and eventually joined Bain and Company where she rose through the ranks.',
      videoDuration: '17:01'
    },
    current: {
      tags: ['Inner Journey', 'Foundation', 'Self-Observation', 'Community Work', 'Spiritual Growth', 'Conscious Living', 'Dwarka'],
      currentCities: ['Dwarka, Delhi'],
      organizations: [{ role: 'Full-Time Contributor; Fund, Community Management, Foundation Development', org: 'Supermorpheus' }],
      travelCities: ['Pondicherry', 'Chandigarh', 'Jaipur'],
      summary: 'Anu lives in Dwarka near the airport. Focused on inner growth and community work, she is now a full-time contributor at Supermorpheus working on fund management, community programs, and foundation development.',
      videoDuration: '9:22'
    }
  }
}

export const members = [
  {
    id: 'member-001',
    firstName: 'Priya',
    lastName: 'Sharma',
    profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'TechStart India',
    currentRole: 'Founder & CEO',
    livesIn: 'Mumbai, India',
    email: 'priya@techstart.in',
    phone: '+91 98765 43210',
    introduction: 'Building the future of EdTech in India. Former Google engineer turned entrepreneur. Passionate about making quality education accessible to every child in the country.',
    status: 'super',
    tags: ['EdTech', 'AI/ML', 'Startup', 'Education'],
    inspiringQuote: 'Education is the most powerful weapon to change the world.',
    joyOutsideWork: 'Classical dance, mentoring young women in tech, and cooking South Indian recipes.',
    linkedin: 'https://linkedin.com/in/priyasharma',
    joinedDate: '2024-11-20',
    videos: {
      earlyLife: { status: 'published', url: 'https://example.com/videos/priya-early.mp4', thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&h=120&fit=crop' },
      professionalLife: { status: 'published', url: 'https://example.com/videos/priya-professional.mp4', thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&h=120&fit=crop' },
      currentLife: { status: 'under_review', url: 'https://example.com/videos/priya-current.mp4', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=120&fit=crop' }
    },
    lifeStories: {
      earlyLife: {
        tags: ['Coding', 'Mathematics', 'Science Olympiad', 'Debate', 'Classical Dance', 'Carnatic Music'],
        bornIn: 'Jaipur',
        hometown: 'Mumbai',
        schools: ['Sophia High School, Mumbai'],
        universities: ['IIT Bombay - Computer Science', 'Stanford University - MS CS'],
        summary: 'Priya grew up in a family of educators in Jaipur before moving to Mumbai. She was a national science olympiad winner and started coding at age 12. Her love for both technology and classical dance shaped her into a well-rounded thinker.',
        videoDuration: '8:45'
      },
      professional: {
        tags: ['Google', 'Search', 'AI/ML', 'EdTech', 'Startup', 'Product Management', 'Engineering Leadership'],
        firstJob: 'Google - Software Engineer',
        subsequentJobs: ['Google - Senior Engineer, Tech Lead', 'TechStart India - Founder & CEO'],
        summary: 'After graduating from Stanford, Priya joined Google where she worked on search algorithms and AI/ML for 6 years. She rose to Tech Lead before leaving to start TechStart India, driven by the desire to make quality education accessible to every Indian child.',
        videoDuration: '12:30'
      },
      current: {
        tags: ['EdTech', 'AI Tutoring', 'Rural Education', 'Impact', 'Mentorship', 'Women in Tech'],
        currentCities: ['Mumbai'],
        organizations: [{ role: 'Founder & CEO', org: 'TechStart India' }, { role: 'Board Advisor', org: 'Girls Who Code India' }],
        travelCities: ['Bengaluru', 'Delhi', 'San Francisco'],
        summary: 'Priya now leads TechStart India, an AI-powered learning platform reaching 500K+ students across rural India. She actively mentors young women in tech and sits on the board of Girls Who Code India.',
        videoDuration: '7:15'
      }
    }
  },
  {
    id: 'member-002',
    firstName: 'Rahul',
    lastName: 'Verma',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'GreenEnergy Solutions',
    currentRole: 'Co-Founder',
    livesIn: 'Delhi, India',
    email: 'rahul@greenenergy.co',
    phone: '+91 98765 43211',
    introduction: 'Climate tech enthusiast working on making renewable energy accessible to everyone. IIT Delhi alum with a mission to reduce carbon footprint across South Asia.',
    status: 'active',
    tags: ['CleanTech', 'Sustainability', 'B2B', 'Solar'],
    inspiringQuote: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    joyOutsideWork: 'Marathon running, nature photography, and volunteering at animal shelters.',
    linkedin: 'https://linkedin.com/in/rahulverma',
    joinedDate: '2024-12-05',
    videos: {
      earlyLife: { status: 'published', url: 'https://example.com/videos/rahul-early.mp4', thumbnail: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=200&h=120&fit=crop' },
      professionalLife: { status: 'under_review', url: 'https://example.com/videos/rahul-professional.mp4', thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=200&h=120&fit=crop' },
      currentLife: { status: 'not_uploaded', url: null, thumbnail: null }
    },
    lifeStories: {
      earlyLife: {
        tags: ['Running', 'Nature', 'Photography', 'Physics', 'Environment', 'Trekking'],
        bornIn: 'Lucknow',
        hometown: 'Delhi',
        schools: ['Modern School, Barakhamba Road, Delhi'],
        universities: ['IIT Delhi - Electrical Engineering'],
        summary: 'Rahul spent his childhood between Lucknow and Delhi. An avid nature lover from a young age, he would spend weekends photographing birds and running marathons. His passion for physics and the environment led him to IIT Delhi.',
        videoDuration: '9:20'
      },
      professional: {
        tags: ['Solar Energy', 'Climate Tech', 'Sustainability', 'Policy', 'TERI', 'Renewable Energy'],
        firstJob: 'TERI - Research Associate',
        subsequentJobs: ['SunEdison - Project Manager', 'ReNew Power - VP Operations', 'GreenEnergy Solutions - Co-Founder'],
        summary: 'Rahul started his career at TERI researching renewable energy policy. He moved to SunEdison and then ReNew Power, gaining deep expertise in solar energy operations. In 2022, he co-founded GreenEnergy Solutions to make clean energy accessible to SMBs across South Asia.',
        videoDuration: '14:10'
      }
    }
  },
  {
    id: 'member-003',
    firstName: 'Ananya',
    lastName: 'Krishnan',
    profilePicture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'HealthFirst',
    currentRole: 'CTO',
    livesIn: 'Chennai, India',
    email: 'ananya@healthfirst.com',
    phone: '+91 98765 43212',
    introduction: 'Healthcare technology leader with 15 years of experience. Built telemedicine platforms serving 2M+ patients. Passionate about digital health innovation in tier-2 cities.',
    status: 'super',
    tags: ['HealthTech', 'Digital Health', 'SaaS', 'Telemedicine'],
    inspiringQuote: 'Technology should serve humanity, not the other way around.',
    joyOutsideWork: 'Bharatanatyam, reading medical history, and gardening on weekends.',
    linkedin: 'https://linkedin.com/in/ananyakrishnan',
    joinedDate: '2024-10-15',
    videos: {
      earlyLife: { status: 'published', url: 'https://example.com/videos/ananya-early.mp4', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=120&fit=crop' },
      professionalLife: { status: 'published', url: 'https://example.com/videos/ananya-professional.mp4', thumbnail: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=200&h=120&fit=crop' },
      currentLife: { status: 'published', url: 'https://example.com/videos/ananya-current.mp4', thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&h=120&fit=crop' }
    },
    lifeStories: {
      earlyLife: {
        tags: ['Bharatanatyam', 'Biology', 'Medicine', 'Reading', 'Tamil Literature', 'Volunteering'],
        bornIn: 'Chennai',
        hometown: 'Chennai',
        schools: ['D.A.V. Senior Secondary School, Chennai'],
        universities: ['Anna University - Biomedical Engineering', 'CMU - MS Health Informatics'],
        summary: 'Ananya grew up in a culturally rich Tamil family in Chennai. She was trained in Bharatanatyam from age 5 and developed a deep love for biology and medicine. Her grandmother\'s struggle with accessing healthcare in rural Tamil Nadu inspired her path.',
        videoDuration: '11:05'
      },
      professional: {
        tags: ['HealthTech', 'Telemedicine', 'Digital Health', 'SaaS', 'Product', 'Engineering', 'Public Health'],
        firstJob: 'Philips Healthcare - Software Developer',
        subsequentJobs: ['Practo - Engineering Manager', 'Apollo 24/7 - VP Engineering', 'HealthFirst - CTO'],
        summary: 'Ananya began at Philips Healthcare building diagnostic software, then moved to Practo where she built telemedicine features. At Apollo 24/7 she led the engineering team, and now as CTO of HealthFirst, she has built platforms serving 2M+ patients.',
        videoDuration: '15:40'
      },
      current: {
        tags: ['Telemedicine', 'Tier-2 Cities', 'AI Diagnostics', 'Women Health', 'Public Health', 'Mentorship'],
        currentCities: ['Chennai'],
        organizations: [{ role: 'CTO', org: 'HealthFirst' }, { role: 'Advisor', org: 'TN Health Innovation Council' }],
        travelCities: ['Bengaluru', 'Hyderabad', 'Boston'],
        summary: 'Ananya leads HealthFirst\'s technology vision, focused on bringing AI-powered diagnostics to tier-2 and tier-3 cities. She also advises the Tamil Nadu government on health innovation and mentors women engineers.',
        videoDuration: '8:50'
      }
    }
  },
  {
    id: 'member-004',
    firstName: 'Vikram',
    lastName: 'Singh',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'FinLeap',
    currentRole: 'Founder',
    livesIn: 'Bengaluru, India',
    email: 'vikram@finleap.in',
    phone: '+91 98765 43213',
    introduction: 'Fintech founder focused on financial inclusion. Building banking for the next billion. Previously led payments at Paytm. Angel investor in 12+ startups.',
    status: 'active',
    tags: ['FinTech', 'Payments', 'Inclusion', 'Angel Investor'],
    inspiringQuote: 'Banking should be invisible, not a burden.',
    joyOutsideWork: 'Cricket, angel investing meetups, and exploring street food across India.',
    linkedin: 'https://linkedin.com/in/vikramsingh',
    joinedDate: '2025-01-02',
    videos: {
      earlyLife: { status: 'published', url: 'https://example.com/videos/vikram-early.mp4', thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=120&fit=crop' },
      professionalLife: { status: 'not_uploaded', url: null, thumbnail: null },
      currentLife: { status: 'not_uploaded', url: null, thumbnail: null }
    },
    lifeStories: {
      earlyLife: {
        tags: ['Cricket', 'Street Food', 'Commerce', 'Trading', 'Stock Market', 'Mathematics'],
        bornIn: 'Chandigarh',
        hometown: 'Bengaluru',
        schools: ['Bishop Cotton Boys School, Bengaluru'],
        universities: ['BITS Pilani - Economics', 'IIM Ahmedabad - MBA Finance'],
        summary: 'Vikram grew up obsessed with numbers and cricket. He started trading stocks as a teenager using his father\'s demat account. His early fascination with financial markets led him to pursue economics at BITS Pilani and later an MBA at IIM Ahmedabad.',
        videoDuration: '10:30'
      }
    }
  },
  {
    id: 'member-005',
    firstName: 'Meera',
    lastName: 'Patel',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'CreativeMinds Studio',
    currentRole: 'Design Director',
    livesIn: 'Pune, India',
    email: 'meera@creativeminds.co',
    phone: '+91 98765 43214',
    introduction: 'Design thinking advocate helping startups build user-centric products. NID Ahmedabad graduate. Speaker at DesignUp and UX India conferences.',
    status: 'basic',
    tags: ['Design', 'UX', 'Consulting', 'Design Thinking'],
    inspiringQuote: 'Good design is invisible. Great design is unforgettable.',
    joyOutsideWork: 'Pottery classes, museum hopping, and designing board games.',
    linkedin: 'https://linkedin.com/in/meerapatel',
    joinedDate: '2025-01-10',
    videos: {
      earlyLife: { status: 'not_uploaded', url: null, thumbnail: null },
      professionalLife: { status: 'not_uploaded', url: null, thumbnail: null },
      currentLife: { status: 'not_uploaded', url: null, thumbnail: null }
    }
  },
  {
    id: 'member-006',
    firstName: 'Arjun',
    lastName: 'Nair',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'LogiSmart',
    currentRole: 'CEO',
    livesIn: 'Hyderabad, India',
    email: 'arjun@logismart.in',
    phone: '+91 98765 43215',
    introduction: 'Supply chain optimization expert making logistics smarter with AI. ISB Hyderabad alum. Our platform moves 50K+ shipments daily across 200 cities.',
    status: 'super',
    tags: ['Logistics', 'AI', 'Supply Chain', 'B2B SaaS'],
    inspiringQuote: 'The last mile is the hardest mile, and that is where the opportunity lies.',
    joyOutsideWork: 'Sailing, building RC drones, and coaching basketball for kids.',
    linkedin: 'https://linkedin.com/in/arjunnair',
    joinedDate: '2024-09-28',
    videos: {
      earlyLife: { status: 'published', url: 'https://example.com/videos/arjun-early.mp4', thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=120&fit=crop' },
      professionalLife: { status: 'published', url: 'https://example.com/videos/arjun-professional.mp4', thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&h=120&fit=crop' },
      currentLife: { status: 'under_review', url: 'https://example.com/videos/arjun-current.mp4', thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=120&fit=crop' }
    },
    lifeStories: {
      earlyLife: {
        tags: ['Basketball', 'Sailing', 'Robotics', 'Drones', 'Physics', 'Electronics'],
        bornIn: 'Trivandrum',
        hometown: 'Hyderabad',
        schools: ['Hyderabad Public School, Begumpet'],
        universities: ['NIT Trichy - Mechanical Engineering', 'ISB Hyderabad - MBA'],
        summary: 'Arjun grew up in Hyderabad with a passion for building things. From LEGO robots as a kid to RC drones in college, he was always fascinated by mechanics and logistics. Basketball and sailing taught him teamwork and strategy.',
        videoDuration: '9:55'
      },
      professional: {
        tags: ['Logistics', 'AI', 'Supply Chain', 'Operations', 'Amazon', 'B2B SaaS', 'Optimization'],
        firstJob: 'Amazon India - Operations Manager',
        subsequentJobs: ['Delhivery - VP Operations', 'LogiSmart - Founder & CEO'],
        summary: 'Arjun cut his teeth at Amazon India managing warehouse operations across 3 states. He then joined Delhivery as VP Operations, optimizing last-mile delivery. In 2021, he founded LogiSmart to bring AI-powered supply chain optimization to mid-market companies.',
        videoDuration: '13:20'
      },
      current: {
        tags: ['AI Logistics', 'Last Mile', 'Smart Warehousing', 'Sustainability', 'Coaching'],
        currentCities: ['Hyderabad'],
        organizations: [{ role: 'Founder & CEO', org: 'LogiSmart' }, { role: 'Basketball Coach', org: 'Hyderabad Youth Sports' }],
        travelCities: ['Mumbai', 'Delhi', 'Singapore'],
        summary: 'Arjun leads LogiSmart which now moves 50K+ shipments daily across 200 cities. Outside work, he coaches basketball for underprivileged kids in Hyderabad and is passionate about sustainable logistics.',
        videoDuration: '7:45'
      }
    }
  },
  {
    id: 'member-007',
    firstName: 'Kavya',
    lastName: 'Iyer',
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'FoodChain',
    currentRole: 'Co-Founder & COO',
    livesIn: 'Kochi, India',
    email: 'kavya@foodchain.in',
    phone: '+91 98765 43216',
    introduction: 'Farm-to-fork supply chain innovator. Connecting 10K+ farmers directly to urban consumers. Forbes 30 Under 30 Asia.',
    status: 'active',
    tags: ['AgriTech', 'Supply Chain', 'D2C', 'Impact'],
    inspiringQuote: 'Every meal tells a story. We are making sure the farmer is part of it.',
    joyOutsideWork: 'Organic farming on weekends, Kathakali dance, and writing food blogs.',
    linkedin: 'https://linkedin.com/in/kavyaiyer',
    joinedDate: '2025-01-20',
    videos: {
      earlyLife: { status: 'published', url: 'https://example.com/videos/kavya-early.mp4', thumbnail: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=200&h=120&fit=crop' },
      professionalLife: { status: 'published', url: 'https://example.com/videos/kavya-professional.mp4', thumbnail: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200&h=120&fit=crop' },
      currentLife: { status: 'not_uploaded', url: null, thumbnail: null }
    },
    lifeStories: {
      earlyLife: {
        tags: ['Kathakali', 'Organic Farming', 'Cooking', 'Kerala Cuisine', 'Biology', 'Environmental Science'],
        bornIn: 'Kochi',
        hometown: 'Kochi',
        schools: ['Chinmaya Vidyalaya, Kochi'],
        universities: ['Kerala Agricultural University', 'IIM Kozhikode - MBA'],
        summary: 'Kavya grew up surrounded by spice plantations in Kerala. She learned Kathakali and traditional cooking from her grandmother. Her deep connection to food systems and farming communities shaped her mission to connect farmers directly to consumers.',
        videoDuration: '8:30'
      },
      professional: {
        tags: ['AgriTech', 'Supply Chain', 'D2C', 'Operations', 'Farm-to-Fork', 'Impact Investing'],
        firstJob: 'Flipkart - Category Manager (Grocery)',
        subsequentJobs: ['BigBasket - Head of Supply Chain', 'FoodChain - Co-Founder & COO'],
        summary: 'Kavya started at Flipkart managing the grocery category, then moved to BigBasket leading supply chain for fresh produce. Seeing the disconnect between farmers and consumers, she co-founded FoodChain to create a transparent farm-to-fork supply chain.',
        videoDuration: '11:55'
      }
    }
  },
  {
    id: 'member-008',
    firstName: 'Siddharth',
    lastName: 'Kapoor',
    profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    currentOrganization: 'SpaceView Labs',
    currentRole: 'Founder & CTO',
    livesIn: 'Bengaluru, India',
    email: 'sid@spaceview.tech',
    phone: '+91 98765 43217',
    introduction: 'Building satellite imagery analytics for agriculture and urban planning. Ex-ISRO scientist. Believe in using space tech to solve earthly problems.',
    status: 'super',
    tags: ['SpaceTech', 'Satellite', 'Analytics', 'Deep Tech'],
    inspiringQuote: 'Looking down from space gives you the best perspective on what matters on Earth.',
    joyOutsideWork: 'Astrophotography, trekking in the Himalayas, and building telescopes.',
    linkedin: 'https://linkedin.com/in/sidkapoor',
    joinedDate: '2024-08-15',
    videos: {
      earlyLife: { status: 'published', url: 'https://example.com/videos/sid-early.mp4', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=120&fit=crop' },
      professionalLife: { status: 'published', url: 'https://example.com/videos/sid-professional.mp4', thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=200&h=120&fit=crop' },
      currentLife: { status: 'published', url: 'https://example.com/videos/sid-current.mp4', thumbnail: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=200&h=120&fit=crop' }
    },
    lifeStories: {
      earlyLife: {
        tags: ['Astrophotography', 'Telescopes', 'Physics', 'Space', 'Rockets', 'Science Fairs', 'Trekking'],
        bornIn: 'Delhi',
        hometown: 'Bengaluru',
        schools: ['Kendriya Vidyalaya, Delhi'],
        universities: ['IISc Bengaluru - Physics', 'IISc Bengaluru - PhD Satellite Systems'],
        summary: 'Siddharth grew up gazing at the stars from his Delhi rooftop. He built his first telescope at age 14 and won multiple national science fairs. His obsession with space led him to IISc Bengaluru where he pursued physics and later a PhD in satellite systems.',
        videoDuration: '12:15'
      },
      professional: {
        tags: ['ISRO', 'Satellite Imagery', 'Remote Sensing', 'Agriculture', 'Urban Planning', 'Deep Tech', 'Space Tech'],
        firstJob: 'ISRO - Scientist',
        subsequentJobs: ['ISRO - Senior Scientist, Satellite Imagery Division', 'SpaceView Labs - Founder & CTO'],
        summary: 'Siddharth spent 8 years at ISRO working on satellite imagery and remote sensing. He was part of the team that built India\'s agricultural monitoring satellite. In 2020, he left to start SpaceView Labs, bringing space tech to solve earthly problems in agriculture and urban planning.',
        videoDuration: '16:30'
      },
      current: {
        tags: ['Satellite Analytics', 'Precision Agriculture', 'Smart Cities', 'Climate Monitoring', 'Deep Tech'],
        currentCities: ['Bengaluru'],
        organizations: [{ role: 'Founder & CTO', org: 'SpaceView Labs' }, { role: 'Visiting Researcher', org: 'IISc Bengaluru' }],
        travelCities: ['Hyderabad', 'Houston', 'Tokyo'],
        summary: 'Siddharth now leads SpaceView Labs, providing satellite imagery analytics to farmers, urban planners, and climate researchers. He also serves as a visiting researcher at IISc and spends weekends astrophotographing and trekking in the Himalayas.',
        videoDuration: '9:40'
      }
    }
  }
]

export const newMembers = members.slice(0, 4)

// Pizza level helper: determines profile completion
// 1 slice = only name & contact, half = overview filled, full = at least 1 life story
export const getPizzaLevel = (member) => {
  const hasLifeStory = member.videos && (
    member.videos.earlyLife?.status === 'published' ||
    member.videos.earlyLife?.status === 'under_review' ||
    member.videos.professionalLife?.status === 'published' ||
    member.videos.professionalLife?.status === 'under_review' ||
    member.videos.currentLife?.status === 'published' ||
    member.videos.currentLife?.status === 'under_review'
  )
  if (hasLifeStory) return 'full'
  if (member.introduction) return 'half'
  return 'slice'
}

export const stats = {
  totalMembers: 789,
  newMembersRecent: 24
}
