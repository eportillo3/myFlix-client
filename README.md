# myFlix-client
Client-side myFlix app, built with React, React-Bootstrap and Redux

## API
Server-side API created by me, open access to anyone to use. API hosted with heroku, can be found at [myFlix DB](www.myflixapp2021.herokuapp.com)

## Deployment
Automatic deployment initiated on Netlify, when an update it commited and pushed to the main branch, a new deployment will run.

## User Stories

### User Story Feature 1
As a user, I should be able to register as a new user

```
Given a user has opened the application
And they haven't registered before
When they click "Not Registered?"
Then a new endpoint will generate allowing them to register themselves
```

## User Story Feature 2
As a user, I should be able to login to access movies and my profile

```
Given a user has registered before
When they enter their login information on the main welcome page
And it is correct information
Then they can access all movies and their profile
```

## User Story 3
As a user, I should be able to search a movie by title

```
Given the user has logged to the application
When they click the search bar in the navbar and start typing
Movie responses that match the input will be kept on the page, all other movies will be removed from view
```

## User Story Feature 4
As a user, I should be able to click on a movie for more details

```
Given a user has chosen a movie
When they click "See Details"
Then a new view will open that shows more details and further actions to take
```

## User Story Feature 5
As a user, I want to view information about a movie's genre or director

```
Given a user has already accessed a specific movie detailed view
When they click either "[Director] Info" or "[Genre] Info" buttons
Then the user will be redirected to a new view with details on that content
And lists other movies under the same Director or Genre
```

## User Story Feature 6
As a user, I want to be able to save favorite movies to a list in my profile

```
Given a user has already accessed a specific movie detailed view
When they click the button "Add Movie to Favorites"
Then the movie will be added to a favorites list
And a confirmation window will appear
```

## User Story Feature 7
As a user, I want to be able to view and modify my favorite movies list

```
Given a user has clicked "Profile" from the navbar
And their profile page has rendered in the default "Profile" tab
When the user clicks "Remove" for any of the movies in their Favorite's list
Then the movie will disapear from that view
```

## User Story Feature 8
As a user, I want to be able to update my profile information

```
Given a user is in their Profile view
And they click the "Update" tab
When they enter in any new login information + existing password
And click Update
Then the user information will be changed
```

## User Story Feature 9
As a user, I want to be able to delete my profile

```
Given the user is in their Profile view
And they click the "Delete Profile" tab
When a user clicks the "Click Here If You're Sure!" button
Then the user will be deleted from the server-side collection
And the page will clear their login information and log them out
```

## User Story Feature 10
As a user, I want to log out of the application at any time

```
Given the user is logged in
When they click "Log Out" from the navbar
Then the user will be logged out and their information cleared from local storage
```
