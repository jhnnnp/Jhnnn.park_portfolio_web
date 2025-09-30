import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import emailjs from '@emailjs/browser'

const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export const useEmailForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        setError(null)

        try {
            const templateParams = {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                message: data.message,
                to_name: 'Jinhan Park',
            }

            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id',
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'
            )

            setIsSubmitted(true)
            reset()

            // Reset success state after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false)
            }, 5000)
        } catch (err) {
            console.error('Email sending failed:', err)
            setError('Failed to send message. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting,
        isSubmitted,
        error,
    }
} 