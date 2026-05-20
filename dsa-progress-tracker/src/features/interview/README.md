# Interview Experience Module

## Overview
The Interview Experience module allows users to share and view company-specific interview experiences. This feature helps students prepare for interviews by learning from real experiences shared by others.

## Features
- **Submit Interview Experience**: Users can share their interview experiences with detailed information about rounds, questions, and feedback
- **Browse Experiences**: View all submitted interview experiences with filtering and search capabilities
- **Company-wise Filtering**: Filter experiences by specific companies
- **Detailed View**: View complete interview experience with round-by-round breakdown
- **Search Functionality**: Search experiences by company name, role, or keywords

## Components
- `InterviewList.jsx` - Main listing page with search and filter functionality
- `InterviewCreate.jsx` - Form to submit new interview experience
- `InterviewDetail.jsx` - Detailed view of a specific interview experience

## Data Structure
Each interview experience contains:
- Company name
- Role applied for
- Overall experience description
- Round details (technical rounds, HR rounds, etc.)
- Questions asked in each round
- Difficulty level and feedback
- Submission date and author information

## Firestore Collections
- `interview_experiences` - Stores all interview experiences

## Usage
1. Navigate to `/interviews` to view all experiences
2. Use the search bar to find experiences by company
3. Click on any experience to view details
4. Click "Submit Experience" to share your own interview experience
