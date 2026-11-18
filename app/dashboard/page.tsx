import { PatientDirectory } from "@/components/patient-directory"
import { WorkspaceShell } from "@/components/workspace-shell"
import { patients } from "@/lib/patient-data"

export default function Page() {
  const activeCount = patients.filter((patient) => patient.status === "Active").length
  const followUpCount = patients.filter(
    (patient) => patient.status === "Needs follow-up"
  ).length
  const providerCount = new Set(patients.map((patient) => patient.primaryCareProvider)).size

  return (
    <WorkspaceShell>
      <PatientDirectory
        activeCount={activeCount}
        followUpCount={followUpCount}
        patients={patients}
        providerCount={providerCount}
      />
    </WorkspaceShell>
  )
}
