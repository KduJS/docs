# Utility Types

:::info
This page only lists a few commonly used utility types that may need explanation for their usage.
:::

## PropType\<T>

Used to annotate a prop with more advanced types when using runtime props declarations.

- **Example**

  ```ts
  import { PropType } from 'kdu'

  interface Book {
    title: string
    author: string
    year: number
  }

  export default {
    props: {
      book: {
        // provide more specific type to `Object`
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **See also:** [Guide - Typing Component Props](/guide/typescript/options-api.html#typing-component-props)

## ComponentCustomProperties

Used to augment the component instance type to support custom global properties.

- **Example**

  ```ts
  import axios from 'axios'

  declare module 'kdu' {
    interface ComponentCustomProperties {
      $http: typeof axios
      $translate: (key: string) => string
    }
  }
  ```

  :::tip
  Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api.html#augmenting-global-properties) for more details.
  :::

- **See also:** [Guide - Augmenting Global Properties](/guide/typescript/options-api.html#augmenting-global-properties)

## ComponentCustomOptions

Used to augment the component options type to support custom options.

- **Example**

  ```ts
  import { Route } from 'kdu-router'

  declare module 'kdu' {
    interface ComponentCustomOptions {
      beforeRouteEnter?(to: any, from: any, next: () => void): void
    }
  }
  ```

  :::tip
  Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api.html#augmenting-global-properties) for more details.
  :::

- **See also:** [Guide - Augmenting Custom Options](/guide/typescript/options-api.html#augmenting-custom-options)

## ComponentCustomProps

Used to augment allowed TSX props in order to use non-declared props on TSX elements.

- **Example**

  ```ts
  declare module 'kdu' {
    interface ComponentCustomProps {
      hello?: string
    }
  }

  export {}
  ```

  ```tsx
  // now works even if hello is not a declared prop
  <MyComponent hello="world" />
  ```

  :::tip
  Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api.html#augmenting-global-properties) for more details.
  :::

## CSSProperties

Used to augment allowed values in style property bindings.

- **Example**

  Allow any custom CSS property

  ```ts
  declare module 'kdu' {
    interface CSSProperties {
      [key: `--${string}`]: string
    }
  }
  ```

  ```tsx
  <div style={ { '--bg-color': 'blue' } }>
  ```
  ```html
  <div :style="{ '--bg-color': 'blue' }">
  ```

 :::tip
  Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api.html#augmenting-global-properties) for more details.
  :::
  
  :::info See also
SFC `<style>` tags support linking CSS values to dynamic component state using the `k-bind CSS` function. This allows for custom properties without type augmentation. 

- [k-bind() in CSS](/api/sfc-css-features.html#k-bind-in-css)
  :::
