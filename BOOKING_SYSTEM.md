# Booking System Implementation

## Overview
A complete booking system has been implemented with full CRUD operations, user relationships, and comprehensive API integration.

## API Endpoints

### Booking API ([src/api/booking.js](src/api/booking.js))

#### Create Booking
```javascript
POST /api/bookings
createBooking(data)
```
**Parameters:**
- `checkInDate` - Date (YYYY-MM-DD)
- `checkOutDate` - Date (YYYY-MM-DD)
- `numberOfGuests` - Number
- `totalPrice` - Number
- `accommodationId` - String (optional)
- `activityId` - String (optional)
- `notes` - String (optional)
- `userId` - String (user relationship)

#### Get All Bookings
```javascript
GET /api/bookings?populate=*
fetchBookings(filters)
```
**Filter Options:**
- `status` - pending, confirmed, cancelled
- `userId` - Filter by user
- `accommodationId` - Filter by accommodation

#### Get Booking by ID
```javascript
GET /api/bookings/:id?populate=*
fetchBookingById(id)
```

#### Update Booking
```javascript
PUT /api/bookings/:id
updateBooking(id, data)
```
**Parameters:** Same as create (all optional)

#### Delete Booking
```javascript
DELETE /api/bookings/:id
deleteBooking(id)
```

#### Create Booking Localization
```javascript
POST /api/bookings/:id/localizations
createBookingLocalization(bookingId, data)
```

#### Get User Bookings
```javascript
GET /api/bookings?filters[user][id][$eq]=userId&populate=*
fetchUserBookings(userId)
```

#### Cancel Booking
```javascript
cancelBooking(id)
```
Sets status to "cancelled"

#### Confirm Booking
```javascript
confirmBooking(id)
```
Sets status to "confirmed"

## Components

### BookingForm ([src/components/BookingForm.jsx](src/components/BookingForm.jsx))
Enhanced form component for creating bookings with:
- Check-in/Check-out date inputs
- Guest number input
- Price input
- Notes textarea
- Automatic night calculation
- Duration display
- User authentication check
- Success confirmation
- Form validation with Zod
- Toast notifications
- Loading states

**Props:**
- `title` - Form title (default: "Make a Booking")
- `onSubmit` - Callback on successful booking
- `accommodationId` - Pre-filled accommodation
- `activityId` - Pre-filled activity

## Pages

### Booking Page ([src/pages/Booking.jsx](src/pages/Booking.jsx))
Protected route displaying the BookingForm component.

### My Bookings ([src/pages/MyBookings.jsx](src/pages/MyBookings.jsx))
Protected page for authenticated users to manage their bookings with:
- List of all user bookings
- Filter by status (all, pending, confirmed, cancelled)
- Booking details display
  - Booking ID
  - Status badge with icon
  - Total price
  - Check-in/Check-out dates
  - Number of guests
  - Creation date
  - Notes
- Action buttons based on status
  - Confirm button (pending status)
  - Cancel button (pending status)
  - Delete button (cancelled/pending status)
- Empty state when no bookings
- Loading state while fetching
- Error handling with toast notifications

## Routes

| Route | Component | Type | Description |
|-------|-----------|------|-------------|
| `/booking` | BookingPage | Protected | Make new booking |
| `/my-bookings` | MyBookings | Protected | View user bookings |

## Navigation

### Navbar Updates
- Added "My Bookings" link in authenticated dropdown menu
- Link appears between user info and "Change Password"
- Only visible to authenticated users

## Booking Data Structure

```javascript
{
  id: String,
  checkInDate: Date,
  checkOutDate: Date,
  numberOfGuests: Number,
  totalPrice: Number,
  status: "pending" | "confirmed" | "cancelled",
  accommodationId: String (optional),
  activityId: String (optional),
  notes: String,
  user: Object (User from users-permissions),
  createdAt: Date,
  updatedAt: Date,
  localizations: Array (optional)
}
```

## Features

✅ Create bookings with validation
✅ View all user bookings
✅ Filter bookings by status
✅ Update booking status (confirm/cancel)
✅ Delete bookings
✅ Localization support
✅ User relationship with authentication
✅ Night calculation
✅ Form validation
✅ Error handling
✅ Toast notifications
✅ Loading states
✅ Responsive design
✅ Protected routes
✅ Success confirmations

## Authentication Integration

All booking operations require:
- User to be logged in
- Valid JWT token in localStorage
- Token automatically sent in Authorization header

## Form Validation

Using Zod schema:
- Check-in date: Required
- Check-out date: Required, must be after check-in
- Number of guests: Min 1
- Total price: Positive number
- Accommodation/Activity: Optional
- Notes: Optional

## Error Handling

- Failed requests show toast error
- Missing auth shows login error
- Invalid dates prevented by validation
- Server errors displayed to user
- Console logging for debugging

## Success Flow

1. User logs in (auth stored in context)
2. User navigates to `/booking`
3. Fills in booking form
4. Form validates inputs
5. API call creates booking
6. Success toast notification
7. Confirmation message displays
8. Form resets after 2 seconds
9. User can navigate to `/my-bookings` to view booking
