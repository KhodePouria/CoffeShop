import { ChangeEvent, useState } from "react";

export function useBase64() {
    const [base64, setBase64] = useState<string>()

    function handleImageChange(
        event?: ChangeEvent<HTMLInputElement>
    ) {
        if (!event) {
            setBase64('')
            return
        }

        const file = event.target.files?.[0]

        if (!file) {
            setBase64('')
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            setBase64(reader.result as string)
        }
        reader.readAsDataURL(file)
    }


    return { base64, setBase64, handleImageChange }

}