import Link from "next/link"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  HeartPulse,
  MapPin,
  Phone,
  Pill,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react"

import { WorkspaceShell } from "@/components/workspace-shell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  formatPatientDate,
  getPatientAge,
  getPatientById,
  getPatientInitials,
  getPatientName,
  type Patient,
} from "@/lib/patient-data"

function RecordSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string
  description: string
  icon: typeof HeartPulse
  children: ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function DetailValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  )
}

function MedicationList({ patient }: { patient: Patient }) {
  if (patient.medications.length === 0) {
    return <p className="text-sm text-muted-foreground">No medications listed in this sample record.</p>
  }

  return (
    <ul className="flex flex-col divide-y">
      {patient.medications.map((medication) => (
        <li className="flex gap-3 py-3 first:pt-0 last:pb-0" key={medication.name}>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Pill aria-hidden="true" className="size-4" />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-sm font-medium">{medication.name}</p>
            <p className="text-xs text-muted-foreground">
              {medication.dosage} · {medication.instructions}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function VisitList({ patient }: { patient: Patient }) {
  return (
    <ol className="flex flex-col gap-5">
      {patient.visits.map((visit, index) => (
        <li className="relative flex gap-3" key={`${visit.date}-${visit.type}`}>
          <span className="relative flex w-3 shrink-0 justify-center">
            {index < patient.visits.length - 1 ? (
              <span className="absolute top-3 -bottom-6 w-px bg-border" />
            ) : null}
            <span className="relative mt-1 size-2 rounded-full bg-primary ring-4 ring-background" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p className="text-sm font-medium">{visit.type}</p>
              <time className="text-xs text-muted-foreground" dateTime={visit.date}>
                {formatPatientDate(visit.date)}
              </time>
            </div>
            <p className="text-xs text-muted-foreground">{visit.clinician}</p>
            <p className="pt-1 text-sm leading-relaxed text-muted-foreground">
              {visit.summary}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function PatientRecord({ patient }: { patient: Patient }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:gap-8 md:px-8 md:py-9">
      <Link
        className="flex w-fit items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        href="/dashboard"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to patient directory
      </Link>

      <Card>
        <CardContent className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between md:py-7">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar aria-hidden="true" className="size-16">
              <AvatarFallback className="bg-primary/10 text-lg font-medium text-primary">
                {getPatientInitials(patient)}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {getPatientName(patient)}
                </h1>
                <Badge variant={patient.status === "Needs follow-up" ? "default" : patient.status === "Active" ? "secondary" : "outline"}>
                  {patient.status}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span>{patient.id}</span>
                <span aria-hidden="true">·</span>
                <span>{getPatientAge(patient.dateOfBirth)} years</span>
                <span aria-hidden="true">·</span>
                <span>{patient.pronouns}</span>
              </div>
            </div>
          </div>
          <div className="grid gap-3 border-t pt-4 text-sm sm:grid-cols-2 md:min-w-80 md:border-t-0 md:border-l md:pt-0 md:pl-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone aria-hidden="true" className="size-4 shrink-0" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
              <MapPin aria-hidden="true" className="size-4 shrink-0" />
              <span>{patient.address}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
              <UserRound aria-hidden="true" className="size-4 shrink-0" />
              <span>{patient.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card size="sm">
          <CardHeader className="flex-row items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Stethoscope aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <CardDescription>Primary care provider</CardDescription>
              <CardTitle className="text-sm">{patient.primaryCareProvider}</CardTitle>
            </div>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader className="flex-row items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <CalendarDays aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <CardDescription>Next appointment</CardDescription>
              <CardTitle className="text-sm">{formatPatientDate(patient.nextAppointment)}</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </div>

      <section aria-label="Patient record details" className="grid items-start gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <RecordSection
            description="Ongoing health concerns and known allergies."
            icon={HeartPulse}
            title="Conditions & allergies"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xs font-medium text-muted-foreground">Conditions</h2>
                <div className="flex flex-wrap gap-2">
                  {patient.conditions.map((condition) => (
                    <Badge key={condition} variant="secondary">{condition}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xs font-medium text-muted-foreground">Allergies</h2>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.map((allergy) => (
                    <Badge key={allergy} variant="outline">{allergy}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </RecordSection>

          <RecordSection
            description="Current medications listed for this sample record."
            icon={Pill}
            title="Medications"
          >
            <MedicationList patient={patient} />
          </RecordSection>

          <RecordSection
            description="A brief note for the care team."
            icon={ClipboardList}
            title="Care note"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">{patient.careNote}</p>
          </RecordSection>
        </div>

        <div className="flex flex-col gap-4">
          <RecordSection
            description={`Most recent readings · ${formatPatientDate(patient.vitals.recordedAt)}`}
            icon={HeartPulse}
            title="Latest vitals"
          >
            <dl className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <DetailValue label="Blood pressure" value={patient.vitals.bloodPressure} />
              <DetailValue label="Heart rate" value={patient.vitals.heartRate} />
              <DetailValue label="Temperature" value={patient.vitals.temperature} />
              <DetailValue label="Weight" value={patient.vitals.weight} />
            </dl>
          </RecordSection>

          <RecordSection
            description="Recent appointments and care-team notes."
            icon={CalendarDays}
            title="Visit history"
          >
            <VisitList patient={patient} />
          </RecordSection>

          <RecordSection
            description="Coverage information for demonstration only."
            icon={ShieldCheck}
            title="Insurance"
          >
            <dl className="grid gap-4 sm:grid-cols-2">
              <DetailValue label="Provider" value={patient.insurance.provider} />
              <DetailValue label="Plan" value={patient.insurance.plan} />
              <DetailValue label="Member ID" value={patient.insurance.memberId} />
            </dl>
          </RecordSection>

          <Card size="sm">
            <CardContent className="flex items-start gap-3">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Prototype record. All details are fictional sample data and are not for clinical use.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default async function PatientRecordPage({
  params,
}: {
  params: Promise<{ patientId: string }>
}) {
  const { patientId } = await params
  const patient = getPatientById(patientId)

  if (!patient) notFound()

  return (
    <WorkspaceShell>
      <PatientRecord patient={patient} />
    </WorkspaceShell>
  )
}