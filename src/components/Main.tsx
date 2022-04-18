import { SaveScreenshots } from './SaveScreenshots'
import {
  AppShell,
  Text,
  Box,
  Group,
  Header,
  MantineProvider,
  Navbar,
  ThemeIcon,
  Title,
  UnstyledButton,
} from '@mantine/core'
import { HashRouter, Route, Routes, Link } from 'react-router-dom'
import { ReactNode } from 'react'
import {
  AlertCircle,
  GitPullRequest,
  ScreenShare,
  TestPipe,
} from 'tabler-icons-react'
import TestModels from '../routes/TestModels/TestModels'

interface MainLinkProps {
  icon: ReactNode
  color: string
  label: string
  path: string
}

const data: MainLinkProps[] = [
  {
    icon: <ScreenShare size={16} />,
    color: 'blue',
    label: 'Fetch Tables Screenshots',
    path: '/save-screenshots',
  },
  {
    icon: <TestPipe size={16} />,
    color: 'teal',
    label: 'Test Models',
    path: '/test-models',
  },
]

function MainLink({ icon, color, label, path }: MainLinkProps) {
  return (
    <UnstyledButton
      component={Link}
      to={path}
      sx={theme => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',

        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

const Shell = ({ children }) => {
  return (
    <MantineProvider theme={{}}>
      <AppShell
        padding="md"
        header={
          <Header
            height={60}
            p="md"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Title order={3} color="blue">
              Poker Table Finder
            </Title>
          </Header>
        }
        navbar={
          <Navbar width={{ base: 300 }} p="xs">
            <Navbar.Section mt="xs">
              {data.map(link => (
                <MainLink {...link} key={link.label} />
              ))}
            </Navbar.Section>
          </Navbar>
        }
        styles={theme => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </MantineProvider>
  )
}

const Main = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Shell>
              <Title>Main Page</Title>
            </Shell>
          }
        />
        <Route
          path="/save-screenshots"
          element={
            <Shell>
              <SaveScreenshots />
            </Shell>
          }
        />
        <Route
          path="/test-models"
          element={
            <Shell>
              <TestModels />
            </Shell>
          }
        />
      </Routes>
    </HashRouter>
  )
}

export default Main
