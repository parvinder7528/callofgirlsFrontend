import ProfilePage from '@/pages/myProfile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/myprofile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProfilePage/>
}
