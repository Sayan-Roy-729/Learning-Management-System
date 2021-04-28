# Learning Management System Backend (LMS - Backend)
This backend is deployed in [heroku](https://dashboard.heroku.com)
## Rest API URLS:
### API Base URL
**https://lms-backend-rest-api.herokuapp.com/api/v1**
### Get Available Courses
- **End Point:** /get 
- **Method:** GET
- **Description:** This api only returns the courses that are stored into database. If there are two 3 courses into the database, and every course has its own content videos, then this api only returns the json of course of course image url, course title and course title.
- **Example Response with 200 Status Code:**
```json
{
    "message": "Successful",
    "courses": [
        {
            "_id": "608973b7705e56457832f837",
            "name": "html",
            "description": "This Specialization covers how to write syntactically correct HTML5 and CSS3, and how to create interactive web experiences with JavaScript. Mastering this range of technologies will allow you to develop high quality web sites that, work seamlessly on mobile, tablet, and large screen browsers accessible. During the capstone you will develop a professional-quality web portfolio demonstrating your growth as a web developer and your knowledge of accessible web design. This will include your ability to design and implement a responsive site that utilizes tools to create a site that is accessible to a wide audience, including those with visual, audial, physical, and cognitive impairments.",
            "imageUrl": "uploads\\1619620785930-3722310205.57203-9CJzwl0qV-.jpg",
            "slug": "html",
            "__v": 0
        },
        {
            "_id": "60897e6f1c38280ba41f10e2",
            "name": "css",
            "description": "The web today is almost unrecognizable from the early days of white pages with lists of blue links.  Now, sites are designed with complex layouts, unique fonts, and customized color schemes.   This course will show you the basics of Cascading Style Sheets (CSS3).  The emphasis will be on learning how to write CSS rules, how to test code, and how to establish good programming habits.   ",
            "imageUrl": "uploads\\1619623535190-3381486020.3694773-odXj3izUR-.png",
            "slug": "css",
            "__v": 0
        }
    ]
}
```
- **Error Response:**
  - **Status Code 404:** *No course found*. If there is no course uploaded into the database, then this error will be occurred.
  - **Status Code 500:** If any server side error occurred (with *error message*)


### Get Contents of a Particular Course:
- **End Point:** /get?name=html
-  **Description:** To fetch the content videos, only pass an additional information (query parameter of key *name*). 
-  **Example Response with 200 Status Code:**
```json
{
    "massage": "Successful",
    "content": [
        {
            "_id": "608980c41c38280ba41f10e3",
            "name": "html form tag",
            "description": "The HTML <form> tag is used for creating a form for user input. A form can contain textfields, checkboxes, radio-buttons and more. Forms are used to pass user-data to a specified URL.",
            "parentId": "608973b7705e56457832f837",
            "slug": "html-form-tag",
            "videoUrl": "uploads\\1619624131379-7889552058.900995-WLg96MaNZ-.mp4",
            "__v": 0
        },
        {
            "_id": "608981101c38280ba41f10e4",
            "name": "div tag",
            "description": "The div tag is known as Division tag. The div tag is used in HTML to make divisions of content in the web page like (text, images, header, footer, navigation bar, etc). Div tag has both open(<div>) and closing (</div>) tag and it is mandatory to close the tag. The Div is the most usable tag in web development because it helps us to separate out data in the web page and we can create a particular section for particular data or function in the web pages.",
            "parentId": "608973b7705e56457832f837",
            "slug": "div-tag",
            "videoUrl": "uploads\\1619624208312-7358984440.518963-9otLAihwX-.mp4",
            "__v": 0
        }
    ]
}
```
- **Error Response:**
  - **Status Code 404:** *Course Not found!*. If there is no course into the database.
  - **Status Code 404:** *Content Not found!*. If there is no video contents of the course.
  - **Status Code 500:** If any server side error occurred (with *error message*)
