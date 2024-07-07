import { MessageProps } from '../types'

export const ChatMessage = ({ profilePic, message }: MessageProps) => {
    return (
        <div className='flex gap-2 mt-4'>
            {/* Profile */}
            <div className="rounded-full border w-10 h-10 flex items-center justify-center dark:bg-#213547">
                {profilePic && (
                    <img
                        src={profilePic}
                        className="w-full h-full rounded-full object-fill"
                    />
                )}
            </div>
            {/* Message */}
            <div className="px-1 flex-1 min-w-11/12 text-left w-full">
                {message}
            </div>
        </div>
    )
}
