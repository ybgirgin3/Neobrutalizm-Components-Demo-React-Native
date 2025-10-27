import React, { Children, cloneElement, isValidElement, ReactNode, useState } from 'react';
import {
    Dimensions,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

enum NBButtonType {
    regular = 'regular',
    confirm = 'confirm',
    cancel = 'cancel'
}

type NBButtonProps = {
    onPress?: () => void;
    buttonType?: NBButtonType;
    width?: number;
    height?: number;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>; // dış yüzey için override
    contentStyle?: StyleProp<ViewStyle>; // children'ı sarmalayan iç yüzey
    children?: ReactNode;
    useTouchable?: boolean; // tabbar içinde interaktif olmaması için
};

const VARIANTS: Record<NBButtonType, { wrapper?: ViewStyle; inner?: ViewStyle; labelColor?: string }> = {
    regular: { wrapper: {}, inner: {}, },
    confirm: { wrapper: { backgroundColor: '#33b9f7ff', borderColor: '#CFEEDC' }, inner: {}, labelColor: '#0A8A3A' },
    cancel: { wrapper: { backgroundColor: '#f73333ff', borderColor: '#F5C6C6' }, inner: {}, labelColor: '#fff9faff' },
};

const NBButton: React.FC<NBButtonProps> = ({
    onPress,
    buttonType = NBButtonType.regular,
    width,
    height,
    disabled,
    style,
    contentStyle,
    children,
    useTouchable = true,
}) => {
    const SCREEN = Dimensions.get('screen');
    const btnWidth = width ?? SCREEN.width * 0.9;
    const btnHeight = height ?? 48;

    const variant = VARIANTS[buttonType];
    const labelColor = variant.labelColor ?? '#222';

    const [pressed, setPressed] = useState(false);

    const disabledStyle: ViewStyle = disabled ? ({ opacity: 0.45 } as ViewStyle) : ({} as ViewStyle);

    // children'ı işle: Text öğelerine veya string/number children'lara labelColor uygula.
    const processedChildren = (() => {
        if (children == null) return <Text style={[styles.label, { color: labelColor }]}>{buttonType === NBButtonType.confirm ? 'CONFIRM' : buttonType === NBButtonType.cancel ? 'CANCEL' : 'BUTTON'}</Text>;

        const arr = Children.toArray(children);
        return arr.map((child, i) => {
            if (typeof child === 'string' || typeof child === 'number') {
                return <Text key={i} style={[styles.label, { color: labelColor }]}>{child}</Text>;
            }
            if (isValidElement(child) && (child.type === Text || (typeof (child.type) === 'object' && (child.type as any).displayName === 'Text'))) {
                const textChild = child as React.ReactElement<any>;
                const childStyle = (textChild.props.style ? ([] as any).concat(textChild.props.style) : []) as any;
                const hasColor = childStyle.some?.((s: any) => s && s.color);
                const newStyle = hasColor ? childStyle : [...childStyle, { color: labelColor }];
                return cloneElement(textChild, { key: i, style: newStyle });
            }
            return child;
        });
    })();

    const wrapperStyle = [
        styles.wrapper,
        variant.wrapper,
        pressed && styles.wrapperPressed,
        disabledStyle,
        style,
        { width: btnWidth, height: btnHeight },
    ];

    const innerStyle = [styles.inner, variant.inner, pressed && styles.innerPressed, contentStyle];

    // Eğer useTouchable false ise sadece View render et — böylece parent tab button press alır
    if (!useTouchable) {
        return (
            <View style={wrapperStyle}>
                <View style={innerStyle}>
                    {processedChildren}
                </View>
            </View>
        );
    }

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            disabled={disabled}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={wrapperStyle}
        >
            <View style={innerStyle}>
                {processedChildren}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 0,
        backgroundColor: '#E6EEF7',
        borderWidth: 4,
        borderColor: '#CFE0F6',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    wrapperPressed: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
        transform: [{ translateY: 1 }],
        elevation: 2,
    },
    inner: {
        flex: 1,
        margin: 6,
        borderRadius: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ffffff',
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        paddingHorizontal: 12,
    },
    innerPressed: {
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
        transform: [{ translateY: 1 }],
    },
    label: {
        fontWeight: '600',
    },
});

export default NBButton;