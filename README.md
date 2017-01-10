# CodeSui Tracking Backend
## What does it do?

CodeSui tracking will help your company monitor and discover profitable ad channels, whilst highlighting ad revenue losses. Our system is fully automated and supports email, facebook and google. Our application is very easy to customtise, read the docs below.

## How does it work?

Our system uses utm tags, forms and other Javascript events to capture what a user is doing on your application. With this data, we discover what terms, campaigns, mediums and sources draw in customers that ultimately make purchases and generate profit.

---

# Overall Description
## Sessions

A session is created every time a customer visits your app, the session is stored as a cookie and lasts for 8 hours. Why 8? We find that it's a happy medium, if a customer leaves your app and comes back at a later date, we want to count this as something different entirely, our system will keep track of the customer but any activity is attributed to a new session. This is customisable and you can increase or decrease the session duration depending on your needs.

## Activities

Activities describe what a user is doing in a session. We have 3 built in activity types (more below) with activities you'll discover what campaigns drive your customers to submit contact forms, subscribe and make purchases.

## Users

Users are the glue between sessions and activities and will show you how a customer is using your website. Do they fill in a contact form first? Do they make a purchase first? Do visit and then come back at a later date to purchase? You'll discover exactly how your revenue is generated.

Users are created when a customer provides his email (typically from a form), so contact, purchase, booking, subscription etc.

## Adding more to the reports

We don't know what software you're using, so we've made a few extra tools that your dev team can use to get a better revenue breakdown. You can tie in your invoices, inventories and currencies (these need to be linked by a purchase ID explained below)

---

# Installation (dev team's job)
We built this using [AdonisJS](https://adonisjs.com/docs/3.2/installation) go checkout the installation but for ease -

* A computer
* NPM >= 3.0.0
* NODE >= 4.0.0
* GIT

## Commands required
- git clone https://github.com/MattGould1/codesui_tracking_backend.git
- cd codesui_tracking_backend
- npm install
- npm run dev
- finished

## Config
Our system AdonisJS - most of the config is with them however the most critical for this report is that everything is UTC. You may want to change this, and that's easy to do, just change your systems timezone.

Checkout the adonisjs docs for further config details.

---

# Reports (weekly, monthly, quarterly, yearly) (checkout the routes file in project)

Reports are very detailed, we've setup two types of reports, "at a glance" and "full reports".

## At A Glance
At a glance reports show you (time by time) breakdowns of sessions created, conversion rates, purchases, billed purchases, converted sessions and converted purchases.

## Full Reports
Full reports have all data that we track and provide A LOT of filters to look through. I'll update this when I have time.

# Report Specifics
### Activity_type
Out of the box, we support 3 activity types and they correlate to what a customer is (in general) doing. We've broke it down into Contact (1), Subscribe (2) and Purchase (3). You can easily add your own types into our system like so...

```
<script>
        var activity = 'homepage';
        var email = document.getElementsByClassName('signup_email').value;
        setOpportoppunityInCookies(email, 4, null, activity); // 4 = Signup
        saveOpportunity(email, '', activity); //send it off to the tracking database
</script>
```
### Activity_id
The report also has an activity_id, which further describes what it is a customer is doing. This is particularly useful when you're dealing with multiple forms on a single page. You'll probably want to track which form they used, to do so you need to create a hidden field with a class name of "cs_activity" (example below). You can also add this field to pages with one form, if you for example, you want to match up results from your homepage form, and your latest bounce landing page form.

```
<input type="hidden" class="cs_activity" value="header_blog">
```

### Purchase ID
Your purchase id might be the unique ID column on your table, a confirmation_code etc - in our system it doesn't matter so much "what" the purchase id is, but it must correlate to your own database.

To add a purchase id to an activity, in the form you will need to add, since you need to send this to the tracking database you'll probably need an ajax call somewhere, or some Javascript to fire on a completition page.

```
<input type="hidden" class="cs_purchaseid" value="123">
```

### Others
There are a lot of other filters, if I have time I'll list and describe them in detail...

### Report breakdown
* Spend (input manually)
* Engagement (Total Sessions)
* Conversons
* * Leads
* * Assisted Leads
* Gross Purchases
* * Direct Purchases
* * Assisted Purchases
* Complete Purchases (invoice sent)
* Billed Purchases (invoice paid)
* Conversion Rate
* * Sessions
* * Purchases
* Cost
* * Cost Per Session
* * Cost Per Subscriber (2)
* * Cost Per Contact (1)
* * Cost Per Purchase (3)
* * Cost Per Complete Purchase
* * Cost Per Billed Purchase
* Overall Purchase Completition

# Graphs (weekly, monthly)
Graphs are very good for displaying and comparing large datasets. We find that our at a glance reports are good for small chunks of data (say 10 weeks) but for 100 weeks? There's just too much on a screen. Graphs help us solve a big problem - viewing trends across large datasets. 	

### Don't forget to go and install the client for UI reports!


<div></div>