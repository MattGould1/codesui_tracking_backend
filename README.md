# CodeSui Tracking Backend
## What does it do?

CodeSui tracking will help you (and your company) discover profitable ad channels (and unprofitable ones) be it newspaper, email, facebook, google or just about any service that will let you add utm tags.

We use utm tags, forms and other Javascript events to capture what a user is doing on your website/app. With this data, we discover what terms, campaigns, mediums and sources draw in customers that ultimately make purchases and are profitable.

---

# Non-tech description
## Sessions

A session is created every time a customer visits your app, a session lasts for 8 hours. Why 8? A returning customer could be doing something entirely different, or return through different means. It's a good place to stop, you could increase or decrease the duration depending on your needs.

## Activities

Activities are used to describe what a user is doing in a particular session. You'll be able to discover what keywords drive traffic that make leads, make sales and generate profit. 

## Users

Users are created when a customer submits a form that has an email field (typically contact, purchase, booking, subscription etc). All prior sessions and activities are attributed to each user.

## Adding more to the reports

Because we don't know what software you're using, we have made a few extra tools to help, but will ultimately need a dev team to implement. For example, our system can tie in invoices, inventories and currencies.

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
Timezone is by default UTC however if you setup AWS, Digitalocean, Linode or whatever your host is with a different timezone, the app will use that.

Checkout the adonisjs docs for further config details.

---

# Reports (weekly, monthly, quarterly, yearly) (checkout the routes file in project)
Largely, all reports are the same just some have extra days.

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

### Don't forget to go and install the client for UI reports!