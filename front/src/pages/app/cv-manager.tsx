/* este codigo utilizou ajuda de ia */

import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import html2pdf from 'html2pdf.js'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { authContext } from '@/context/auth-context'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { toastSuccessStyle } from '@/lib/toast-success-style'

interface CVManagerProps {
  userId?: string
  /* onSave?: (content: string) => void */
}

const CVManager: React.FC<CVManagerProps> = ({ userId }) => {
  const { user } = useContext(authContext)
  const [loading, setLoading] = useState(false)
  const quillRef = useRef<ReactQuill | null>(null)

  // Default CV template
  const defaultCVTemplate = `
    <div>
            <header>
                <h1>Your Name</h1>
                <br>
                <p><strong>Email:</strong> your.email@example.com | <strong>Phone:</strong> (123) 456-7890</p>
                <p><strong>GitHub:</strong> <a href="https://github.com/yourprofile">github.com/yourprofile</a> | <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/yourprofile">linkedin.com/in/yourprofile</a></p>
                <br>
            </header>
            
            <section>
                <h2>Professional Summary</h2>
                <br>
                <p>Junior web developer with 2+ years of hands-on experience in developing and maintaining websites using modern technologies such as HTML5, CSS3, JavaScript, and React.js. Proven ability to enhance website functionality and improve UX/UI with a focus on responsive design. Seeking a front-end web developer role to continue growing my skills in creating interactive web applications while contributing to a dynamic team. Strong proficiency in debugging, optimizing performance, and collaborating with cross-functional teams.</p>
                <br>
            </section>
            
            <section>
                <h2>Work Experience</h2>
                <br>  
                <article>
                    <h3>Junior Web Developer | Company Name, Location</h3>
                    <p><strong>June 2022 – Present</strong></p>
                    <ul>
                        <li>Boosted website loading speed by 35% by optimizing images and improving CSS delivery, reducing user bounce rates by 20%.</li>
                        <li>Designed and developed 15+ custom landing pages, increasing customer conversion rates by 10%.</li>
                        <li>Improved website accessibility scores by 40% by integrating WCAG 2.1 standards, enhancing user experience for all visitors.</li>
                        <li>Spearheaded a UI redesign project for the company’s e-commerce platform, resulting in a 25% increase in customer engagement.</li>
                    </ul>
                </article>
                
                <article>
                    <h3>Front-End Developer Intern | Another Company, Location</h3>
                    <p><strong>Sept 2021 – May 2022</strong></p>
                    <ul>
                        <li>Developed and maintained responsive web applications using HTML, CSS, and JavaScript for 3+ projects, enhancing overall site usability by 15%.</li>
                        <li>Assisted in the deployment of a new React.js application, decreasing site load times by 20% through efficient code optimization.</li>
                        <li>Collaborated with senior developers to implement SEO strategies that increased organic traffic by 18%.</li>
                        <li>Created reusable UI components that reduced development time by 25% across multiple projects.</li>
                    </ul>
                </article>
            </section>
            
            <section>
                <br>
                <h2>Skills</h2>
                <br>
                <p><strong>Languages:</strong> HTML5, CSS3, JavaScript, React.js, Node.js</p>
                <p><strong>Tools:</strong> Git, VS Code, Webpack, NPM, Postman</p>
                <p><strong>Frameworks:</strong> Bootstrap, Tailwind CSS, Express.js</p>
                <p><strong>Other:</strong> Responsive design, Cross-browser compatibility, API integration, Debugging</p>
            </section>
            
            <section>
                <br>
                <h2>Education</h2>
                <br>
                <h3>Bachelor of Science in Computer Science | University Name, Location</h3>
                <p><strong>Graduation Date:</strong> May 2022</p>
            </section>
        </div>
  `

  const [content, setContent] = useState<string>('')

  // Initialize with default template when component mounts
  useEffect(() => {
    if (user?.cvData) {
      return setContent(user?.cvData)
    }
    setContent(defaultCVTemplate)
  }, [user?.cvData, defaultCVTemplate])

  // Quill.js configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
      ['clean'],
    ],
  }

  // Export to PDF function with improved style preservation
  const exportToPDF = () => {
    const quillEditor = quillRef.current?.getEditor()
    if (!quillEditor) return

    // Create a temporary div for the cleaned content
    const contentDiv = document.createElement('div')

    // Deep clone the content, preserving all styles
    const clonedContent = quillEditor.root.cloneNode(true) as HTMLElement

    // Add a style element for preserving headers and formatting
    const styleEl = document.createElement('style')
    styleEl.textContent = `
      h1 { font-size: 2rem !important; margin-bottom: 0.5rem; font-weight: bold; }
      h2 { font-size: 1.5rem !important; margin-bottom: 0.5rem; margin-top: 1rem; font-weight: bold; }
      h3 { font-size: 1.25rem !important; margin-bottom: 0.5rem; font-weight: bold; }
      p { margin-bottom: 0.5rem; line-height: 1.5; }
      ul { margin-left: 1.5rem; margin-bottom: 1rem; }
      li { margin-bottom: 0.25rem; }
      strong { font-weight: bold; }
    `

    // Append both the style and content
    contentDiv.appendChild(styleEl)
    contentDiv.appendChild(clonedContent)

    const opt = {
      margin: 1,
      filename: `cv-${userId || 'document'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
      },
    }

    // Use the cleaned content div for PDF generation
    html2pdf().set(opt).from(contentDiv).save()
  }

  // Handle CV Save
  const handleSave = async () => {
    try {
      setLoading(true)
      await api.patch('/cv', { content })
      toast.success('CV updated with success!', toastSuccessStyle)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('Error: Problem while trying to update the CV ')
      }
    } finally {
      setLoading(false)
    }
  }

  const resetCv = async () => {
    setContent(defaultCVTemplate)
  }

  const handleRef = useCallback((ref: ReactQuill | null) => {
    if (!ref) {
      return console.error('Error on quill ref')
    }

    const quill = ref.getEditor()

    quill.root.setAttribute('spellcheck', 'false')

    quillRef.current = ref
  }, [])

  return (
    <div className="text-center md:px-60 md:h-full flex justify-center items-center md:mx-14">
      <div className="cv-manager flex-col flex gap-5 ">
        <div className="text-editor">
          <ReactQuill
            ref={handleRef}
            value={content}
            onChange={setContent}
            modules={modules}
          />
        </div>
        <div className="mt-2 mx-4 flex space-x-4 justify-around">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 text-white rounded"
          >
            Save CV
          </Button>
          <Button onClick={resetCv} className="px-4 py-2 text-white rounded">
            Reset CV
          </Button>
          <Button
            onClick={exportToPDF}
            className="px-4 py-2 text-white rounded"
          >
            Export to PDF
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CVManager
