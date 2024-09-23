import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import {
  signInWithGooglePopUp,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function SignUp(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  const navigate = useNavigate();

  const onLoginSuccess = () => {
    navigate('/users');
  };

  const signUpWithGoogle = () => {
    const name = form.values.name;
    signInWithGooglePopUp(setLoading, name, onLoginSuccess);
  };

  const signInWithEmail = async (event: any) => {
    event.preventDefault();

    setLoading(true);
    const signInSuccess = await signInAuthUserWithEmailAndPassword(
      form.values.email,
      form.values.password,
      setLoading
    );

    if (signInSuccess) {
      toast.success('LoggedIn Successfully');
      form.reset();
      setLoading(false);
      onLoginSuccess();
    } else {
      toast.error('Please SignIn again.');
    }
  };

  const signUpWithEmail = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const signUpSuccess = await createAuthUserWithEmailAndPassword(
      form.values.name,
      form.values.email,
      form.values.password,
      setLoading,
      onLoginSuccess
    );

    if (signUpSuccess) {
      toast.success('SignedUp Successfully');
      form.reset();
      setLoading(false);
    } else {
      toast.error('Please SignUp again.');
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (type === 'register') {
      await signUpWithEmail(event);
    } else {
      await signInWithEmail(event);
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Center>
        <Text size="lg" fw={500}>
          Welcome Back,{' '}
          <span style={{ textTransform: 'capitalize' }}> {type}</span> with
        </Text>
      </Center>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={signUpWithGoogle}>
          Google
        </GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={handleSubmit}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue('name', event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group mt="xl" style={{ justifyContent: 'space-between' }}>
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
