# BKIT Student Corporate College Portal Solution
        
Create a student, corporate, and college portal for BKIT Solution with AI integrated, single page landing site with more and precise content 
IT SOLUTIONS where we create next generation developers
BKIT Solutions is a dynamic organization dedicated to empowering students and institutions through innovative training programs and IT solutions
Services Offered :
* College & Corporate Trainings
* Placement Support
* Industry Connects
* IT Solutions
Helping students get ready for campus recruitment
Training company employees to improve their skills
Custom training options made especially for colleges or companies as needed
Helping colleges find job opportunities for their students
Finding jobs for graduates who have already finished college
Linking colleges with the industry through campus events
Organizing hackathons with top companies
Arranging meetings between HR managers and colleges
Creating custom software and websites for businesses
Helping companies advertise online
Developing mobile apps for smartphones and tablets
Our hiring partners include top companies
Content and images should refer to India and Indians 
Reach us at:
Email : info@bkitsolutions.in
website : bkitsolutions.in
Contact : +91 8121034516

Made with Floot.

# Instructions

For security reasons, the `env.json` file is not pre-populated — you will need to generate or retrieve the values yourself.  

For **JWT secrets**, generate a value with:  

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then paste the generated value into the appropriate field.  

For the **Floot Database**, request a `pg_dump` from support, upload it to your own PostgreSQL database, and then fill in the connection string value.  

**Note:** Floot OAuth will not work in self-hosted environments.  

For other external services, retrieve your API keys and fill in the corresponding values.  

Once everything is configured, you can build and start the service with:  

```
npm install -g pnpm
pnpm install
pnpm vite build
pnpm tsx server.ts
```
