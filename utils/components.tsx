import { ReactNode } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

type ParentProps = {
    children: ReactNode
}

export function Title({ children }: ParentProps) {
    return <Text style={styles.title}>
        {children}
    </Text>
}

export function Paragraph({ children }: ParentProps) {
    return <Text style={styles.paragraph}>
        {children}
    </Text>
}

export function Screen({ children }: ParentProps) {
    return <View style={styles.screen}>
        {children}
    </View>
}