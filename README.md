A marketplace application built with Next.js Ionic and Capacitor

## Before start

Change url on the 8th line of `capacitor.config.ts` file for your local IP address 

```bash
 yarn #to install dependencies
 npx cap sync #to install dependencies for ios and android devices
```

## Run application

```bash
 yarn dev #to run the application
 npx cap run ios
 #or
 npx cap run android #to run the application on a device emulator
```

Now you can open the application in browser of your laptop and in a device emulator of your choice.
You can also open the application with your mobile browser by putting your local address from
the 8th line of `capacitor.config.ts`.

## Notes

feed/[item]/page.tsx was not included into final release because I couldn't use filesystem
to generate static params, coz it's node.js environment.

The most optimal way to implement additional tasks is to use firebase DB and SDK.
The firebase has convenient Google authentication, and it's non-relative db 
would be the most optimal option to store such information as marketplace items and all the information
about those items.
Synchronization between devices would be implemented fairly easy with firebase db.
The whole feed would be stored there and would be updated each time a user creates an item.
Also with that the deletion and update of the created items could be implemented. Because now 
we can track which item was created by current user to let them edit or delete it
(the whole idea is that no one else can edit or delete items of others)

## Next steps

Implement everything from additional tasks which is described in notes above

As soon as we're using Next.js I would implement also a web application for desktop, 
so we can use the whole potential of the SSR.

A better design would be great)
