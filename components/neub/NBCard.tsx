import React, { ReactNode } from "react";
import {
    Dimensions,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";

type NBCardProps = {
    width?: number; // px
    height?: number; // px
    style?: StyleProp<ViewStyle>; // dış container stilini override etmek için
    contentStyle?: StyleProp<ViewStyle>; // children'ı sarmalayan container için stil
    children?: ReactNode;
};

const NBCard: React.FC<NBCardProps> = ({
    width,
    height,
    style,
    contentStyle,
    children,
}) => {
    const SCREEN = Dimensions.get("screen");
    const cardWidth = width ?? SCREEN.width * 0.9;
    const cardHeight = height ?? 200;

    return (
        <View style={[styles.wrapper, style]}>
            {/* dış "neubrutal" yüzey */}
            <View
                style={[styles.card, { width: cardWidth, height: cardHeight }]}
            >
                {/* iç padding / kontrast yüzey - children burada yer alır */}
                <View style={[styles.inner, contentStyle]}>
                    {children ?? <Text style={styles.placeholder}>CARD</Text>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    // ana kart - koyu gölge + kalın kenar ile neubrutal görünümü
    card: {
        borderRadius: 0,
        backgroundColor: "#E6EEF7",
        borderWidth: 4,
        borderColor: "#CFE0F6",
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        // Android elevation
        elevation: 6,
    },
    // iç yüzey: daha açık, hafif iç kenar efekti
    inner: {
        flex: 1,
        margin: 0,
        borderRadius: 0,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        // hafif ters yönde gölge ile "brutal" kontrast
        shadowColor: "#ffffff",
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 0.08,
        shadowRadius: 0,
    },
    placeholder: {
        color: "#666",
    },
});

export default NBCard;
