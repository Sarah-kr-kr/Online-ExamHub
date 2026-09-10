'use client'

import { useState, useMemo } from 'react'
import { useAuth } from '@/lib/auth-context'
import {
  HelpCircle,
  Sparkles,
  RefreshCw,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Globe,
  CheckCircle2,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface FaqItem {
  id: string
  question: string
  answer: string
  category?: string
}

// 🎓 STUDENT FAQ POOLS (Rotated daily)
const STUDENT_FAQ_POOLS: FaqItem[][] = [
  [
    {
      id: 'std-1',
      question: 'How do I enter and take an exam using an exam code?',
      answer:
        'Enter your 6-character exam code in the "Join Exam" box on the home page or dashboard, then click "Enter Exam". Make sure to join before the scheduled end time.',
      category: 'Exam Entry',
    },
    {
      id: 'std-2',
      question: 'What happens if I accidentally switch tabs or open another application?',
      answer:
        'The anti-cheat proctoring system tracks tab focus. Warning #1 alerts you to return. A second tab switch automatically stops your exam with a score of 0. However, your instructor can grant you a last chance to resume live.',
      category: 'Anti-Cheat Warnings',
    },
    {
      id: 'std-3',
      question: 'Where can I review my submitted exam answers and score breakdown?',
      answer:
        'Immediately upon submission, or via your Student Dashboard under exam history, click "Details" to view your score, percentage, and an option-by-option breakdown of correct answers.',
      category: 'Results & Scoring',
    },
    {
      id: 'std-4',
      question: 'How do Study Rooms work for students?',
      answer:
        'Students can join public study rooms or enter private room passcodes. Inside rooms, you can view course files uploaded by instructors and participate in discussion threads.',
      category: 'Study Rooms',
    },
  ],
  [
    {
      id: 'std-5',
      question: 'Can I retake an exam after submitting it?',
      answer:
        'By default, each student can only submit an exam once. If a technical issue occurred, your instructor can grant a last chance from their proctoring panel to reopen your session.',
      category: 'Submissions',
    },
    {
      id: 'std-6',
      question: 'Why is browser navigation locked while taking an exam?',
      answer:
        'Navigation locking ensures exam security. Browser back buttons, refreshing, or tab closing are restricted while an exam is in progress to prevent unauthorized navigation.',
      category: 'Exam Security',
    },
    {
      id: 'std-7',
      question: 'How is my overall grade average calculated on my dashboard?',
      answer:
        'Your student dashboard automatically aggregates all your completed exam submissions, calculating your overall score average and total tests taken in real time.',
      category: 'Dashboard',
    },
    {
      id: 'std-8',
      question: 'Can I download reference materials shared by instructors in Study Rooms?',
      answer:
        'Yes! Instructors can upload PDF, DOC, and TXT reference files up to 50MB in Study Rooms, which member students can preview or download anytime.',
      category: 'Resources',
    },
  ],
  [
    {
      id: 'std-9',
      question: 'What should I do if an exam is marked "Locked" by the instructor?',
      answer:
        'A locked status indicates that the instructor has temporarily closed student entry. Please wait for your instructor to unlock the session or verify the scheduled start time.',
      category: 'Exam Status',
    },
    {
      id: 'std-10',
      question: 'Are my personal exam scores visible to other students?',
      answer:
        'No. Your individual submission details and scores are strictly confidential, accessible only to you, your instructor, and platform administrators.',
      category: 'Privacy',
    },
    {
      id: 'std-11',
      question: 'How does partial point scoring work for multiple choice questions?',
      answer:
        'For questions with multiple correct options, points are assigned per correct option selected, giving you partial credit even if only some answers are chosen.',
      category: 'Scoring',
    },
    {
      id: 'std-12',
      question: 'What browsers and devices are supported for taking exams?',
      answer:
        'Online-ExamHub is fully responsive and supports modern web browsers (Chrome, Edge, Firefox, Safari) on laptops, desktops, tablets, and smartphones.',
      category: 'Compatibility',
    },
  ],
]

// 👨‍🏫 INSTRUCTOR FAQ POOLS (Rotated daily)
const TEACHER_FAQ_POOLS: FaqItem[][] = [
  [
    {
      id: 'tch-1',
      question: 'How does the AI Exam Studio generate exams from PDF documents?',
      answer:
        'Upload lecture slides, PDF notes, or text files in the AI Studio (/exam/generate). The AI analyzes document structure to generate standard multiple choice and true/false question banks in seconds.',
      category: 'AI Studio',
    },
    {
      id: 'tch-2',
      question: 'How do I monitor live proctoring alerts and grant a last chance?',
      answer:
        'Open the Exam Admin Panel (/exams/[code]/admin). Live proctoring alerts notify you of tab switches. Click "Give Last Chance" next to any student to clear their warning and resume their session live.',
      category: 'Live Proctoring',
    },
    {
      id: 'tch-3',
      question: 'How do I configure start and end schedules for an exam?',
      answer:
        'When creating or editing an exam, specify exact start and end date-time windows. Student entry is automatically disabled outside these bounds.',
      category: 'Scheduling',
    },
    {
      id: 'tch-4',
      question: 'What happens if an exam code I enter already exists in the database?',
      answer:
        'Online-ExamHub enforces unique exam codes. If a code is taken, the system prompts you to choose a different code, ensuring existing exams are never overwritten.',
      category: 'Exam Codes',
    },
  ],
  [
    {
      id: 'tch-5',
      question: 'How do I refine AI-generated question banks using plain text prompts?',
      answer:
        'Use the Prompt Refinement box in AI Studio (e.g., "Make Q2 harder", "Add 3 true/false questions on SQL"). The AI updates target questions while keeping your draft intact.',
      category: 'AI Refinement',
    },
    {
      id: 'tch-6',
      question: 'How do I lock an active exam or set student capacity limits?',
      answer:
        'In the Exam Admin Panel Settings tab, toggle "Lock Exam" to prevent new joins, or specify a maximum capacity limit (e.g. 50 students).',
      category: 'Room Control',
    },
    {
      id: 'tch-7',
      question: 'Can I manually kick or disqualify a student during an active exam?',
      answer:
        'Yes. In the Participants tab of the Exam Admin Panel, click "Kick" next to any participant to disqualify them and end their active session immediately.',
      category: 'Participant Actions',
    },
    {
      id: 'tch-8',
      question: 'How do I create and manage private Study Rooms for my course?',
      answer:
        'Go to Study Rooms (/rooms), click "Create Room", select "Private", and set a room passcode. Share the passcode with your class to grant access.',
      category: 'Study Rooms',
    },
  ],
  [
    {
      id: 'tch-9',
      question: 'Can I save AI-generated exam drafts into my reusable library?',
      answer:
        'Yes! Click "Save Draft to AI DB" in AI Studio to store drafts in your permanent library. You can reload, edit, or publish them anytime.',
      category: 'Library',
    },
    {
      id: 'tch-10',
      question: 'Where can I view class performance distribution charts?',
      answer:
        'In the Exam Admin Panel Overview, view interactive score distribution bar charts (Recharts), overall averages, and pass/fail metrics for all submissions.',
      category: 'Analytics',
    },
    {
      id: 'tch-11',
      question: 'How do I upload reference materials for students in Study Rooms?',
      answer:
        'Instructors can upload course PDFs, DOCX files, and spreadsheets up to 50MB directly into Study Rooms for member students.',
      category: 'File Storage',
    },
    {
      id: 'tch-12',
      question: 'How do I inspect individual student answer choices and points awarded?',
      answer:
        'Click "Details" next to any participant record in the Exam Admin Panel to view an option-by-option breakdown of their choices and score breakdown.',
      category: 'Audit & Grading',
    },
  ],
]

// 🛡️ ADMIN FAQ POOLS (Rotated daily)
const ADMIN_FAQ_POOLS: FaqItem[][] = [
  [
    {
      id: 'adm-1',
      question: 'How does the Admin System Hub manage user accounts across roles?',
      answer:
        'Administrators have full CRUD authority in /admin to search, inspect details, update roles (Student, Instructor, Admin), and delete user accounts.',
      category: 'User Management',
    },
    {
      id: 'adm-2',
      question: 'How do I register a new Administrator account?',
      answer:
        'Click "Add Admin Account" in the Admin System Hub (/admin) to create a new administrator account with system-wide privileges.',
      category: 'Admin Control',
    },
    {
      id: 'adm-3',
      question: 'Where do I configure the global instructor registration code?',
      answer:
        'System settings are managed in /settings (restricted to Admins). Update teacher_code (default INSTRUCTOR2024) to control teacher registration access.',
      category: 'System Settings',
    },
    {
      id: 'adm-4',
      question: 'Can administrators view system-wide analytics and performance charts?',
      answer:
        'Yes! The Admin Hub provides real-time system stats (Total Students, Instructors, Admins, Exams, Submissions, Average Score) plus global analytics charts.',
      category: 'Global Stats',
    },
  ],
  [
    {
      id: 'adm-5',
      question: 'How does Unified Search work in the Admin System Hub?',
      answer:
        'Search by user number (e.g. #1001) or name query. The system searches across both student/teacher users and admin accounts simultaneously.',
      category: 'Unified Search',
    },
    {
      id: 'adm-6',
      question:
        'Can an administrator manage or delete study rooms and exams created by instructors?',
      answer:
        'Yes, Administrators possess override authority to inspect, update settings, or delete any study room, file upload, or published exam across the platform.',
      category: 'Override Controls',
    },
    {
      id: 'adm-7',
      question: 'How does system maintenance mode work?',
      answer:
        'In /settings, Administrators can toggle global configuration parameters like maintenance_mode and allow_signup dynamically.',
      category: 'Configuration',
    },
    {
      id: 'adm-8',
      question: 'What security measures protect administrative endpoints?',
      answer:
        'All admin endpoints are guarded by verifyToken and allowedTo(userRoles.ADMIN) middleware, enforcing HTTP 403 Forbidden responses for unauthorized requests.',
      category: 'Security & Auth',
    },
  ],
  [
    {
      id: 'adm-9',
      question: 'How do I inspect a specific student dashboard as an administrator?',
      answer:
        'In the Users tab on /admin, click "Dashboard" next to any student to view their exact exam submission history and score analytics.',
      category: 'Student Inspection',
    },
    {
      id: 'adm-10',
      question: 'How are legacy user roles normalized across backend models?',
      answer:
        'The allowedTo middleware normalizes role parameters (e.g., TEACHER and INSTRUCTOR) into standard role strings seamlessly.',
      category: 'Role Normalization',
    },
    {
      id: 'adm-11',
      question: 'What is the procedure if an admin message in a study room needs deletion?',
      answer:
        'Admin messages in study rooms are protected and can only be deleted by another Administrator to maintain audit trails.',
      category: 'Room Auditing',
    },
    {
      id: 'adm-12',
      question: 'How do I monitor overall platform health and active exam count?',
      answer:
        'The Admin System Hub Overview displays real-time widgets showing active exam counts, submission counts, pass/fail ratios, and server health.',
      category: 'System Health',
    },
  ],
]

// 🌐 GUEST / GENERAL FAQ POOLS (Rotated daily for unauthenticated visitors)
const GUEST_FAQ_POOLS: FaqItem[][] = [
  [
    {
      id: 'gst-1',
      question: 'What is Online-ExamHub?',
      answer:
        'Online-ExamHub is a modern web-based examination platform featuring automated grading, AI exam generation, live proctoring, and collaborative study rooms.',
      category: 'Overview',
    },
    {
      id: 'gst-2',
      question: 'How do I register as a student or instructor?',
      answer:
        'Click "Get Started" in the navigation bar. Choose "Student" to create a student account, or "Instructor" (requires your institution access code).',
      category: 'Registration',
    },
    {
      id: 'gst-3',
      question: 'How do students join an exam?',
      answer:
        'Obtain an exam code from your instructor, enter it into the "Join Exam" box on the home page, and click "Enter Exam".',
      category: 'Exam Entry',
    },
    {
      id: 'gst-4',
      question: 'Is Online-ExamHub free to use?',
      answer:
        'Yes! Online-ExamHub provides access to exam creation, AI generation, auto-grading, and study rooms for registered accounts.',
      category: 'Pricing & Access',
    },
  ],
  [
    {
      id: 'gst-5',
      question: 'Can instructors generate exams automatically using AI?',
      answer:
        'Yes! Instructors can upload lecture slides, PDF notes, or text, and our AI Studio generates multi-choice and true/false question banks instantly.',
      category: 'AI Features',
    },
    {
      id: 'gst-6',
      question: 'How does live anti-cheat proctoring work?',
      answer:
        'The platform detects tab switching and window focus changes during active exams, issuing warnings or stopping sessions automatically if violations repeat.',
      category: 'Anti-Cheat',
    },
    {
      id: 'gst-7',
      question: 'Are exam results available immediately after submission?',
      answer:
        'Yes! Automated grading evaluates all objective questions instantly, displaying score breakdowns and percentage results right away.',
      category: 'Instant Grading',
    },
    {
      id: 'gst-8',
      question: 'What features are included in Study Rooms?',
      answer:
        'Study Rooms enable instructors and students to collaborate, share course reference files up to 50MB, and hold real-time discussions.',
      category: 'Study Rooms',
    },
  ],
  [
    {
      id: 'gst-9',
      question: 'What security features protect the examination environment?',
      answer:
        'Online-ExamHub enforces JWT authentication, unique exam code validation, navigation locking, and role-based access control (RBAC).',
      category: 'Security',
    },
    {
      id: 'gst-10',
      question: 'Can I take exams on mobile devices?',
      answer:
        'Yes! The responsive design adapts seamlessly across mobile phones, tablets, laptops, and desktop computers.',
      category: 'Mobile Support',
    },
    {
      id: 'gst-11',
      question: 'How are questions scored?',
      answer:
        'Instructors set point values per question. For multiple choice questions, points can be assigned per option for partial credit flexibility.',
      category: 'Scoring Options',
    },
    {
      id: 'gst-12',
      question: 'How do I reset my password if I forget it?',
      answer:
        'Click "Forgot Password" on the sign-in page, enter your registered email, and use the verification code sent to your inbox to reset your password.',
      category: 'Account Recovery',
    },
  ],
]

export function FaqSection() {
  const { user } = useAuth()
  const [manualOffset, setManualOffset] = useState(0)
  const [isRotating, setIsRotating] = useState(false)

  // Calculate day-of-year seed so questions rotate automatically every 24 hours
  const dayOfYear = useMemo(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }, [])

  // Select appropriate FAQ pool based on authenticated user role
  const { poolList, roleLabel, roleIcon, roleColorClass, description } = useMemo(() => {
    const role = user?.role?.toLowerCase()
    if (role === 'student') {
      return {
        poolList: STUDENT_FAQ_POOLS,
        roleLabel: 'Student Guide',
        roleIcon: GraduationCap,
        roleColorClass:
          'from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
        description:
          'Frequently asked questions tailored for students — taking exams, anti-cheat warnings, score reviews, and study rooms.',
      }
    }
    if (role === 'instructor' || role === 'teacher') {
      return {
        poolList: TEACHER_FAQ_POOLS,
        roleLabel: 'Instructor Guide',
        roleIcon: Briefcase,
        roleColorClass:
          'from-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
        description:
          'Frequently asked questions tailored for instructors — AI exam generation, proctoring, capacity settings, and study room administration.',
      }
    }
    if (role === 'admin') {
      return {
        poolList: ADMIN_FAQ_POOLS,
        roleLabel: 'Administrator Guide',
        roleIcon: ShieldCheck,
        roleColorClass:
          'from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
        description:
          'Frequently asked questions tailored for system administrators — account management, platform analytics, global settings, and audit rules.',
      }
    }
    return {
      poolList: GUEST_FAQ_POOLS,
      roleLabel: 'Platform Overview',
      roleIcon: Globe,
      roleColorClass:
        'from-pink-500/10 to-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/20',
      description:
        'Frequently asked questions about Online-ExamHub features, signup, automated evaluation, and security.',
    }
  }, [user?.role])

  // Active pool index derived from day seed + manual rotation offset
  const activePoolIndex = (dayOfYear + manualOffset) % poolList.length
  const currentFaqs = poolList[activePoolIndex]

  const handleManualRotate = () => {
    setIsRotating(true)
    setTimeout(() => {
      setManualOffset((prev) => prev + 1)
      setIsRotating(false)
    }, 250)
  }

  const RoleIconComp = roleIcon

  return (
    <section className="py-16 md:py-24 bg-muted/10 border-t border-border/50 relative overflow-hidden">
      {/* Dynamic background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-pink-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <div className="text-center mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={`gap-1.5 px-3 py-1 bg-gradient-to-r ${roleColorClass} text-xs font-semibold`}
            >
              <RoleIconComp className="w-3.5 h-3.5" />
              {roleLabel}
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1.5 px-3 py-1 bg-primary/10 text-primary border-primary/20 text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Daily AI-Curated FAQs • Rotated Daily
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualRotate}
              className="gap-2 text-xs font-semibold border-primary/30 hover:bg-primary/10 text-primary transition-all shadow-sm"
              title="Click to generate another daily AI FAQ question set"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              Refresh AI FAQs (Set {activePoolIndex + 1} of {poolList.length})
            </Button>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3.5">
          {currentFaqs.map((faq, idx) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-border/70 bg-card hover:border-primary/40 transition-colors duration-300 px-5 rounded-xl shadow-sm"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4 text-sm sm:text-base flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                    Q{idx + 1}
                  </div>
                  <span className="truncate">{faq.question}</span>
                </div>
                {faq.category && (
                  <Badge
                    variant="outline"
                    className="shrink-0 text-[10px] font-mono border-muted-foreground/30 text-muted-foreground hidden sm:inline-flex"
                  >
                    {faq.category}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 pt-1 text-xs sm:text-sm leading-relaxed border-t border-border/40 mt-1">
                <div className="flex items-start gap-2 pt-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{faq.answer}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
