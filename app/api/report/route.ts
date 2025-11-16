import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'

// Generate unique reportId (format: 1 number + 3 letters + 3 numbers)
function generateUniqueReportId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  
  const num1 = numbers[Math.floor(Math.random() * numbers.length)]
  const letter1 = letters[Math.floor(Math.random() * letters.length)]
  const letter2 = letters[Math.floor(Math.random() * letters.length)]
  const letter3 = letters[Math.floor(Math.random() * letters.length)]
  const num2 = numbers[Math.floor(Math.random() * numbers.length)]
  const num3 = numbers[Math.floor(Math.random() * numbers.length)]
  const num4 = numbers[Math.floor(Math.random() * numbers.length)]
  
  return `${num1}${letter1}${letter2}${letter3}${num2}${num3}${num4}`
}

interface ReportsData {
  reports: any[]
}

export async function POST(request: NextRequest) {
  try {
    const reportData = await request.json()
    
    // Create reports directory if it doesn't exist
    const reportsDir = join(process.cwd(), 'reports')
    try {
      await mkdir(reportsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, that's okay
    }
    
    // Read existing reports.json or create new structure
    const reportsFile = join(reportsDir, 'reports.json')
    let allReports: ReportsData = { reports: [] }
    
    try {
      const existingData = await readFile(reportsFile, 'utf-8')
      allReports = JSON.parse(existingData)
    } catch (error) {
      // File doesn't exist yet, start with empty array
      allReports = { reports: [] }
    }
    
    // Generate unique reportId
    const newReportId = generateUniqueReportId()
    
    // Append new report to the array
    allReports.reports.push({
      reportId: newReportId,
      ...reportData
    })
    
    // Write updated JSON back to file
    const jsonString = JSON.stringify(allReports, null, 2)
    await writeFile(reportsFile, jsonString, 'utf-8')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Report saved successfully',
      reportId: newReportId
    })
  } catch (error) {
    console.error('Error saving report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save report' },
      { status: 500 }
    )
  }
}

