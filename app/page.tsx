import { HashShell } from "@/components/hash-shell"
import { SINGLE_FILE } from "@/lib/routes"
import { HomeView } from "@/views/home-view"

export default function HomePage() {
  return SINGLE_FILE ? <HashShell /> : <HomeView />
}
