package com.navigationproj;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class ToastBaseJavaModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    ToastBaseJavaModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }
    @NonNull
    @Override
    public String getName() {
            return "TrainingModule";
    }
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
//        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
//        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show() {
        Toast.makeText(getReactApplicationContext(), "this is test", Toast.LENGTH_LONG).show();
    }

}
