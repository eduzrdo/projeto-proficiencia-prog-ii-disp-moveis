import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

type ButtonProps = TouchableOpacityProps & {
  title: string
}

export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{ width: 200, padding: 16, borderRadius: 8, backgroundColor: '#008870', alignItems: 'center'}}
      {...rest}
    >
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#ffffff'}}>{title}</Text>
    </TouchableOpacity>
  )
}
