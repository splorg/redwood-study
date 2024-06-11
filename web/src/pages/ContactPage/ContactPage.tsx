import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql'

import {
  FieldError,
  Form,
  Submit,
  SubmitHandler,
  TextAreaField,
  TextField,
  Label,
  useForm,
} from '@redwoodjs/forms'
import { Metadata, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

interface FormValues {
  name: string
  email: string
  message: string
}

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
      formMethods.reset()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    create({ variables: { input: data } })
  }
  return (
    <>
      <Metadata title="Contact" description="Contact page" />

      <Toaster />
      <Form
        onSubmit={onSubmit}
        config={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
      >
        {/* <FormError error={error} wrapperClassName="form-error" /> */}
        <Label errorClassName="error" name="name">
          Name
        </Label>
        <TextField
          errorClassName="error"
          validation={{ required: true }}
          name="name"
        />
        <FieldError className="error" name="name" />

        <Label errorClassName="error" name="email">
          Email
        </Label>
        <TextField
          errorClassName="error"
          validation={{
            required: true,
            // pattern: {
            //   value: /^[^@]+@[^.]+\..+$/,
            //   message: 'Please enter a valid email address',
            // },
          }}
          name="email"
        />
        <FieldError className="error" name="email" />

        <Label errorClassName="error" name="message">
          Message
        </Label>
        <TextAreaField
          errorClassName="error"
          validation={{ required: true }}
          name="message"
        />
        <FieldError className="error" name="message" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
