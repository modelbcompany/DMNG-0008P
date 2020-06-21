import { useMutatedProps, useVisibility } from 'hooks'
import { Button, Container, Heading, HeadingProps } from 'lib'
import React, { DialogHTMLAttributes, FC } from 'react'
import { classNames } from 'utils'
import './sass/Dialog.scss'

/**
 * @module Components/Organisms/Dialog
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/dialog}
 */

/**
 * React `<dialog>` properties.
 */
export type ReactDialogProps = DialogHTMLAttributes<HTMLDialogElement>

/**
 * {@link Dialog} component properties.
 */
export interface DialogProps extends ReactDialogProps {
  /**
   * Properties for `<Heading>` component in the dialog header.
   */
  headingProps?: HeadingProps

  /**
   * Initial open state.
   */
  initialVisibility?: boolean

  /**
   * Code to call when the dialog is closed.
   */
  onClose?(event: React.MouseEvent): any
}

/**
 * Renders an `<dialog>` element with the class `ado-dialog`.
 *
 * @param props - Component data
 */
export const Dialog: FC<DialogProps> = ({
  children,
  headingProps,
  onClose,
  initialVisibility,
  ...rest
}) => {
  const mutatedProps = useMutatedProps(rest, 'ado-dialog')
  const { hide, visible } = useVisibility(initialVisibility)

  if (headingProps) {
    headingProps.className = classNames(
      'dialog-heading',
      headingProps.className
    )
  }

  mutatedProps['aria-controlled'] = true

  return (
    <dialog {...mutatedProps} open={rest.open || visible}>
      <Container
        className={`dialog-header flex ${headingProps ? 'spread' : 'end-j'}`}
      >
        {headingProps ? <Heading {...headingProps} /> : null}

        <Button
          aria-controls={mutatedProps.id || true}
          icon={{ 'aria-hidden': false, children: 'close' }}
          name='close'
          onClick={(event: React.MouseEvent) => {
            hide()
            if (onClose) return onClose(event)
          }}
        />
      </Container>

      <Container className='dialog-content'>{children}</Container>
    </dialog>
  )
}

Dialog.defaultProps = {}
