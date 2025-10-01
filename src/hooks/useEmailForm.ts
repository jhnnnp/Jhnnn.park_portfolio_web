import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import emailjs from '@emailjs/browser'

const contactFormSchema = z.object({
    name: z.string().min(2, '이름은 최소 2글자 이상 입력해주세요'),
    email: z.string().email('올바른 이메일 주소를 입력해주세요'),
    subject: z.string().min(5, '제목은 최소 5글자 이상 입력해주세요'),
    message: z.string().min(10, '메시지는 최소 10글자 이상 입력해주세요'),
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
            // 현재 시간 생성 (한국 시간)
            const now = new Date();
            const koreanTime = new Intl.DateTimeFormat('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Seoul'
            }).format(now);

            // EmailJS 템플릿 파라미터 (템플릿에 맞게 수정)
            const templateParams = {
                title: data.subject,        // 제목을 title로 매핑
                name: data.name,           // 발신자 이름
                email: data.email,         // 발신자 이메일
                time: koreanTime,          // 현재 시간 (한국 시간)
                message: data.message,     // 메시지 내용
            }

            // EmailJS 서비스 ID, 템플릿 ID, Public Key 사용
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id',
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'
            )

            setIsSubmitted(true)
            reset()

            // 성공 메시지 5초 후 자동 숨김
            setTimeout(() => {
                setIsSubmitted(false)
            }, 5000)
        } catch (err) {
            console.error('이메일 전송 실패:', err)
            setError('메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.')
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