import { Time } from "@angular/common"

export interface Task {
  id: number
  title: string
  description: string
  dueDate: Date
	dueTime: Time
  priority: "High" | "Medium" | "Low"
  completed: boolean
}