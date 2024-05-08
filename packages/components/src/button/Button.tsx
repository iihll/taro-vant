import {
  defineComponent,
} from 'vue';
import type { PropType,
  CSSProperties,
  ExtractPropTypes,} from 'vue'

// Utils
import {
  extend,
  numericProp,
  preventDefault,
  makeStringProp,
  createNamespace,
  BORDER_SURROUND,
} from '../utils';
import { View, Text, Button } from '@tarojs/components'
import './index.less'

// Components
import { Icon } from '../icon';
// import { Loading, LoadingType } from '../loading';

// Types
import {
  ButtonSize,
  ButtonType,
  ButtonNativeType,
  ButtonIconPosition,
} from './types';

const [name, bem] = createNamespace('button');

export const buttonProps = extend({}, {
  text: String,
  icon: String,
  type: makeStringProp<ButtonType>('default'),
  size: makeStringProp<ButtonSize>('normal'),
  color: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
  nativeType: makeStringProp<ButtonNativeType>('button'),
  loadingSize: numericProp,
  loadingText: String,
  // loadingType: String as PropType<LoadingType>,
  iconPosition: makeStringProp<ButtonIconPosition>('left'),
});

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export default defineComponent({
  name,

  props: buttonProps,

  emits: ['click'],

  setup(props, { emit, slots }) {
    // const route = useRoute();

    const renderLoadingIcon = () => {
      if (slots.loading) {
        return slots.loading();
      }

      // return (
      //   <Loading
      //     size={props.loadingSize}
      //     type={props.loadingType}
      //     class={bem('loading')}
      //   />
      // );
      return null
    };

    const renderIcon = () => {
      if (props.loading) {
        return renderLoadingIcon();
      }

      if (slots.icon) {
        return <View class={bem('icon')}>{slots.icon()}</View>;
      }

      if (props.icon) {
        return (
          <Icon
            name={props.icon}
            class={bem('icon')}
            classPrefix={props.iconPrefix}
          />
        );
      }
    };

    const renderText = () => {
      let text;
      if (props.loading) {
        text = props.loadingText;
      } else {
        text = slots.default ? slots.default() : props.text;
      }

      if (text) {
        return <Text class={bem('text')}>{text}</Text>;
      }
    };

    const getStyle = () => {
      const { color, plain } = props;
      if (color) {
        const style: CSSProperties = {
          color: plain ? color : 'white',
        };

        if (!plain) {
          // Use background instead of backgroundColor to make linear-gradient work
          style.background = color;
        }

        // hide border when color is linear-gradient
        if (color.includes('gradient')) {
          style.border = 0;
        } else {
          style.borderColor = color;
        }

        return style;
      }
    };

    const onClick = (event: MouseEvent) => {
      if (props.loading) {
        preventDefault(event);
      } else if (!props.disabled) {
        emit('click', event);
        // route();
      }
    };

    return () => {
      const {
        type,
        size,
        block,
        round,
        plain,
        square,
        loading,
        disabled,
        hairline,
        nativeType,
        iconPosition,
      } = props;

      const classes = [
        bem([
          type,
          size,
          {
            plain,
            block,
            round,
            square,
            loading,
            disabled,
            hairline,
          },
        ]),
        { [BORDER_SURROUND]: hairline },
      ];

      return (
        <Button
          type={nativeType}
          class={classes}
          style={getStyle()}
          disabled={disabled}
          onTap={onClick}
        >
          <View class={bem('content')}>
            {iconPosition === 'left' && renderIcon()}
            {renderText()}
            {iconPosition === 'right' && renderIcon()}
          </View>
        </Button>
      );
    };
  },
});
