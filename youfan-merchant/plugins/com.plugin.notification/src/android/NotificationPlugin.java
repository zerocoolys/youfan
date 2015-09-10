package com.plugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class NotificationPlugin extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args,
                           CallbackContext callbackContext) throws JSONException {
        if ("send".equals(action)) {
            NotificationManager manager = (NotificationManager) this.cordova
                    .getActivity().getSystemService(
                            Context.NOTIFICATION_SERVICE);

            String title = args.getString(0);
            String text = args.getString(1);
            System.out.println("需要发送的信息..." + text);

            Notification notification = new Notification(R.drawable.icon, text,
                    System.currentTimeMillis());

            notification.setLatestEventInfo(this.cordova.getActivity(), title,
                    text, PendingIntent.getActivity(this.cordova.getActivity(),
                            0, this.cordova.getActivity().getIntent(), 0));

            manager.notify(1, notification);

            return true;
        } else {
            return false;
        }
    }
}