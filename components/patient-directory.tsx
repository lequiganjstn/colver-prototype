"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  ArrowUpRight,
  CalendarDays,
  HeartPulse,
  Search,
  UsersRound,
} from "lucide-react"

import type { Patient, PatientStatus } from "@/lib/patient-data"
import {
  formatPatientDate,
  getPatientAge,
  getPatientInitials,
  getPatientName,
} from "@/lib/patient-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const statusOptions = [
  { label: "All patients", value: "All patients" },
  { label: "Active", value: "Active" },
  { label: "Needs follow-up", value: "Needs follow-up" },
  { label: "Inactive", value: "Inactive" },
]

const statusVariants: Record<PatientStatus, "default" | "secondary" | "outline"> = {
  Active: "secondary",
  "Needs follow-up": "default",
  Inactive: "outline",
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string
  value: number
  description: string
  icon: typeof UsersRound
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            {value}
          </CardTitle>
        </div>
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon aria-hidden="true" />
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export function PatientDirectory({
  patients,
  activeCount,
  followUpCount,
  providerCount,
}: {
  patients: Patient[]
  activeCount: number
  followUpCount: number
  providerCount: number
}) {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All patients")

  const filteredPatients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return patients.filter((patient) => {
      const matchesStatus = status === "All patients" || patient.status === status
      const searchableContent = [
        getPatientName(patient),
        patient.id,
        patient.primaryCareProvider,
        ...patient.conditions,
      ]
        .join(" ")
        .toLowerCase()

      return matchesStatus && searchableContent.includes(normalizedQuery)
    })
  }, [patients, query, status])

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 md:gap-10 md:px-8 md:py-9">
      <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Care workspace
            </p>
            <Badge variant="outline">Synthetic sample data</Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Good morning, care team
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            A clear view of your patients and the next steps in their care.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground">
          <CalendarDays aria-hidden="true" className="size-4" />
          <span>Wednesday, November 18</span>
        </div>
      </section>

      <section aria-label="Patient overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total patients"
          value={patients.length}
          description="Across your care workspace"
          icon={UsersRound}
        />
        <MetricCard
          title="Active patients"
          value={activeCount}
          description="Currently receiving care"
          icon={HeartPulse}
        />
        <MetricCard
          title="Follow-up needed"
          value={followUpCount}
          description="Patients with an upcoming check-in"
          icon={CalendarDays}
        />
        <MetricCard
          title="Care providers"
          value={providerCount}
          description="Across the primary care team"
          icon={UsersRound}
        />
      </section>

      <Card className="gap-0 py-0">
        <CardHeader className="gap-4 border-b py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg">Patient directory</CardTitle>
            <CardDescription>
              Search records by name, patient ID, provider, or condition.
            </CardDescription>
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
            <label className="relative min-w-0 flex-1 sm:w-72">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                aria-label="Search patients"
                className="pl-9"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search patients..."
                value={query}
              />
            </label>
            <Select
              onValueChange={(value) => setStatus(value ?? "All patients")}
              value={status}
            >
              <SelectTrigger aria-label="Filter by patient status" className="w-full sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="flex items-center justify-between px-5 py-3 text-xs text-muted-foreground md:px-6">
            <span>
              Showing {filteredPatients.length} of {patients.length} patients
            </span>
            <span className="hidden sm:inline">Select a patient to view their record</span>
          </div>
          <div className="flex flex-col gap-2 px-3 pb-3 md:hidden">
            {filteredPatients.length === 0 ? (
              <div className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
                No patients match your search. Try another name, ID, or status.
              </div>
            ) : (
              filteredPatients.map((patient) => (
                <Link
                  className="flex min-w-0 flex-col gap-3 rounded-xl border bg-background p-3 transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring"
                  href={`/dashboard/${patient.id}`}
                  key={patient.id}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Avatar aria-hidden="true" className="size-10">
                      <AvatarFallback className="bg-primary/10 font-medium text-primary">
                        {getPatientInitials(patient)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="truncate text-sm font-medium text-foreground">
                        {getPatientName(patient)}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {patient.id} · {getPatientAge(patient.dateOfBirth)} years
                      </span>
                    </span>
                    <Badge className="shrink-0" variant={statusVariants[patient.status]}>
                      {patient.status}
                    </Badge>
                  </span>
                  <span className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-t pt-2 text-xs text-muted-foreground">
                    <span className="truncate">{patient.primaryCareProvider}</span>
                    <span>Next: {formatPatientDate(patient.nextAppointment)}</span>
                  </span>
                </Link>
              ))
            )}
          </div>
          <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="pl-5 md:pl-6">Patient</TableHead>
                <TableHead className="hidden md:table-cell">Date of birth</TableHead>
                <TableHead className="hidden lg:table-cell">Primary provider</TableHead>
                <TableHead className="hidden sm:table-cell">Last visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12 pr-5 md:pr-6">
                  <span className="sr-only">Open record</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell className="h-32 text-center text-muted-foreground" colSpan={6}>
                    No patients match your search. Try another name, ID, or status.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="group">
                    <TableCell className="min-w-56 py-4 pl-5 md:pl-6">
                      <Link
                        className="flex items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        href={`/dashboard/${patient.id}`}
                      >
                        <Avatar aria-hidden="true" className="size-10">
                          <AvatarFallback className="bg-primary/10 font-medium text-primary">
                            {getPatientInitials(patient)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="flex min-w-0 flex-col gap-0.5">
                          <span className="truncate font-medium text-foreground group-hover:text-primary">
                            {getPatientName(patient)}
                          </span>
                          <span className="text-xs text-muted-foreground">{patient.id}</span>
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="flex flex-col gap-0.5">
                        <span>{formatPatientDate(patient.dateOfBirth)}</span>
                        <span className="text-xs text-muted-foreground">
                          {getPatientAge(patient.dateOfBirth)} years · {patient.pronouns}
                        </span>
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {patient.primaryCareProvider}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {formatPatientDate(patient.lastVisit)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[patient.status]}>{patient.status}</Badge>
                    </TableCell>
                    <TableCell className="pr-5 md:pr-6">
                      <Link
                        aria-label={`Open ${getPatientName(patient)}'s record`}
                        className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        href={`/dashboard/${patient.id}`}
                      >
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
          <div className="flex flex-col gap-1 border-t px-5 py-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
            <span>Patient information is fictional and provided for demonstration only.</span>
            <span>Last updated just now</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}