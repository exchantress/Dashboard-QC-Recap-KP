import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const QCRadioGroup = ({ value, onChange }) => {
    return (
        <div className="flex justify-center">
            <RadioGroup
                value={value}
                onValueChange={onChange}
                className="flex items-center gap-3"
            >
                <label className="flex items-center gap-1 cursor-pointer text-xs">
                    <RadioGroupItem value="YES" className="border-green-300 text-green-300" />
                    <p>Yes</p>
                </label>

                <label className="flex items-center gap-1 cursor-pointer text-xs">
                    <RadioGroupItem value="NO" className="border-red-300 text-red-300" />
                    <p>No</p>
                </label>
            </RadioGroup>
        </div>
    )
}