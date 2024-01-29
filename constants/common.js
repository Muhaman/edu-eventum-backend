module.exports = {
    IGNORE_MIDDLEWARE_URLS: ["/", "/users/logIn", "/admin/logIn", "/users/signUp", "/users/confirmUser", "/users/forgetPassword", "/users/getUserById", "/users/reSendOtp", "/search/", "/search/topServiceProviders", "/admin/create", "profiles/getAllProfilesByUserId", "stripe/createExtraProfilePayment", "stripe/updateUserAftExtProPay"],
    USER: {
        TYPE: {},
        ADMIN_USER: () => {
            return [{
                "firstName": "abc",
                "lastName": "cde",
                "userName": "avcsad",
                "image": "",
                "email": "example.com",
                "password": "123456",
                "role": "ADMIN"
            }]
        },
        CATEGORY: {},
    },
    CODE: {SUCCESS: 200, NOT_FOUND: 404, SERVER_ERROR: 500, BAD_REQUEST: 400, UNAUTHORIZED: 401, ALREADY_EXISTS: 422},
    RESPONSE_MESSAGES: {
        SUCCESS: {
            SIGN_UP: "Registration successful.",
            LOG_IN: "You have logged in successfully.",
            LOG_OUT: "You have logged out successfully.",
            PERMISSION_ADDED: "Permission has been added successfully.",
            PERMISSION_DELETED: "Permission has been deleted successfully.",
            PERMISSION: "Permission",
            PERMISSIONS_LIST: "Permissions list",
            PERMISSIONS_UPDATED: "Permissions updated",
            OTP_FOR_RESET_PASSWORD: 'OTP to reset password has been sent to your email',
            PASSWORD_UPDATED: 'Password has been updated successfully',
            NO_RECORD_FOUND: 'No record found',

            CLUSTER_ADDED: "Cluster has been added successfully.",
            CLUSTER_DELETED: "Cluster has been deleted successfully.",
            CLUSTER: "Cluster",
            CLUSTERS_LIST: "Clusters list",
            CLUSTERS_UPDATED: "Cluster updated",

            GROUP_ADDED: "Group has been added successfully.",
            GROUP_DELETED: "Group has been deleted successfully.",
            GROUP: "Group",
            GROUPS_LIST: "Groups list",
            GROUP_UPDATED: "Group updated",
            MAX_AI_GROUP_LIMIT: "Max number of groups in AI cluster has reached",
            MAX_NO_GROUP_LIMIT: "Max number of groups in NO cluster has reached",

            MODULE_ADDED: "Module has been added successfully.",
            MODULE_DELETED: "Module has been deleted successfully.",
            MODULE: "Module",
            MODULES_LIST: "Modules list",
            MODULE_UPDATED: "Module updated",

            SKILL_BUILDER_ADDED: "Skill Builder has been added successfully.",
            SKILL_BUILDER_DELETED: "Skill Builder has been deleted successfully.",
            SKILL_BUILDER: "Skill Builder",
            SKILL_BUILDER_LIST: "Skill Builders list",
            SKILL_BUILDER_UPDATED: "Skill Builder updated",

            CHECK_IN: "Check in",
            CHECK_INS_LIST: "Check ins list",
            CHECK_IN_UPDATED: "Check in updated",

            CONDITION_ADDED: "Condition has been added successfully.",
            CONDITION_DELETED: "Condition has been deleted successfully.",
            CONDITION: "Condition",
            CONDITION_LIST: "Conditions list",
            CONDITION_UPDATED: "Condition updated",

            USER_DELETED: "User has been deleted successfully.",
            USER: "User",
            USERS_LIST: "Users list",
            USER_UPDATED: "User updated",

            STUDY_ADDED: "Study has been added successfully.",
            STUDY_DELETED: "Study has been deleted successfully.",
            STUDY: "Study",
            STUDIES_LIST: "Studies list",
            STUDY_UPDATED: "Study updated",

            EVENT_ADDED: "Event has been added successfully.",
            EVENT_DELETED: "Event has been deleted successfully.",
            EVENT: "Event",
            EVENTS_LIST: "Events list",
            EVENTS_UPDATED: "Event updated",

            PAYMENT_ADDED: "Payment has been added successfully.",
            PAYMENT_DELETED: "Payment has been deleted successfully.",
            PAYMENT: "Payment",
            PAYMENTS_LIST: "Payments list",
            PAYMENTS_UPDATED: "Payment updated",

            STORE_ADDED: "Store has been added successfully.",
            STORE_DELETED: "Store has been deleted successfully.",
            STORE: "Store",
            STORES_LIST: "Store list",
            CATEGORIES_LIST: "Categories list",
            STORE_UPDATED: "Store updated",

            SUPPORT_PERSON_UPDATED: "Support person updated successfully.",

            TRIPS_LIST: "Trips list",
            TRIPS_INGREDIENTS: "Trips ingredients",
            TRIPS_SERVINGS: "Trips servings",
            TRIPS_DETAILS: "Trip details",
            PRODUCT_DETAILS: "Product details",

            SUPER_CATEGORY_ADDED: "Super Category has been added successfully.",
            SUPER_CATEGORY_DELETED: "Super Category has been deleted successfully.",
            SUPER_CATEGORY: "Super Category",
            SUPER_CATEGORY_LIST: "Super Categories list",
            SUPER_CATEGORY_UPDATED: "Super Category updated",
            CATEGORY_MAPPED: "Category mapped successfully",

            COACH_MESSAGE_ADDED: "Message has been added successfully.",
            COACH_MESSAGE_DELETED: "Message has been deleted successfully.",
            COACH_MESSAGE: "Message",
            COACH_MESSAGE_LIST: "Messages list",
            COACH_MESSAGE_UPDATED: "Message updated",

            CONVERSATION_CREATED: "Conversation has been created successfully.",
            CONVERSATION: "Conversation",
            CONVERSATION_LIST: "Conversation list",
            CONVERSATION_MESSAGES: "Conversation Messages",
            CONVERSATION_DELETED: "Conversation Deleted",

            NOTIFICATIONS_LIST: "Notification list",

            ACCESS_TOKEN: "Access Token",
            FITBIT_REDIRECT_URL: "FitBit redirect url",
            FITBIT_DISCONNECTED: "FitBit Account Disconnected",

            CONFIGURATION_ADDED: "Configuration has been added successfully.",
            CONFIGURATIONS_LIST: "Configurations list",
            CONFIGURATION_UPDATED: "Configuration updated",
            CONFIGURATION_DELETED: "Configuration deleted",

            COACH_MSG_ADDED: "Message has been added successfully.",
            COACH_MSG_DELETED: "Message has been deleted successfully.",
            COACH_MSG: "Message",
            COACH_MSGS_LIST: "Messages list",
            COACH_MSG_UPDATED: "Message updated",

            PARTICIPANT_DATA: "Participant Data",

            MESSAGES_DELETED: "Messages has been deleted successfully.",
            MESSAGES_SENT: "Message has been sent successfully.",
            MESSAGES_CREATED: "Conversation has been created successfully.",
            INTERVENTION_CALENDER: "Intervention Calender",

            EXPORTED_DATA: 'Exported Data',
            REQUEST_COMPLETED: 'Request Completed',
            MEALS_LIST: 'Meals list',

            EMAIL_SENT: 'Email sent successfully.'
        },
        FAIL: {
            MISSING_PARAMS: 'Please send all the required parameters.',
            USER_NOT_FOUND: 'User not found',
            INVALID_OTP_EMAIL: 'Invalid OTP or Email',
            WRONG_EMAIL_OR_PASSWORD: 'You have provided wrong email or password',
            REQUEST_NOT_COMPLETED: 'Request not completed, please try again',
            UNAUTHORIZED: 'You are unauthorized, please login and try again',
            ALREADY_EXISTS: 'already exists',
            BULK_DUPLICATE: 'Multiple fields are duplicated',
            RECORD_NOT_FOUND: 'Record not found.',
            OBJECT_ID_CAST: 'One or more provided Object Ids are not valid.',
            STORE_NOT_FOUND: 'No store found'
        },
        OTHERS: {
            SIGNUP_EMAIL_SUBJECT: 'WELCOME',
            FORGOT_EMAIL_SUBJECT: 'FORGOT PASSWORD OTP',
            RELEARN: 'Relearn',
            NEW_MESSAGE: 'New Message',
            FIRST_GROUP_MESSAGE: 'A group has been scheduled for you',
            FIRST_CALL_MESSAGE: 'A call has been scheduled for you',
            FIRST_AUTO_INTERVENTION_MESSAGE: 'A auto message has been scheduled for you',
            SECOND_GROUP_MESSAGE: 'A group has been scheduled for you',
            SECOND_CALL_MESSAGE: 'A call has been scheduled for you',
            SECOND_AUTO_INTERVENTION_MESSAGE: 'A auto message has been scheduled for you',
        }
    },

    ROLES_LIST: {
        ADMIN: 'ADMIN',
        COORDINATOR: 'COORDINATOR',
        COACH: 'COACH',
        PARTICIPANT: 'PARTICIPANT',
    },

    SCHEDULE_TYPE: {
        COACH_CALENDER: 'coach_calender',
        BEFORE_COACH_CALENDER: 'before_coach_calender',
        ASSIGNMENT_PUSH: 'assignment_push',
        ASSIGNMENT_PUSH_3: 'assignment_push_3',
    },

    SCHEDULE_STATUSES: {
        STARTED: 'started',
        COMPLETED: 'completed',
        EXPIRED: 'expired',
        CANCELLED: 'cancelled',
    },

    CLUSTER_CONDITIONS: {
        AI: 'AI',
        NO: 'NO',
    },

    GOAL_TYPES: {
        LOSE: 'LOSE',
        MAINTENANCE: 'MAINTENANCE',
    },

    INTERVENTIONS: {
        GROUP: 'Group',
        CALL_PARA: 'Call Para',
        CALL_MS: 'Call MS',
        AUTO_MESSAGE: 'Auto Message',
        ALGORITHM: 'Algorithm',
    },

    DAYS_LIST: ['Sunday', 'MONDAY', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],

    INTERVENTION_COMBINATIONS: [
        {groups: 8, calls: 6, messages: 10},
        {groups: 0, calls: 12,  messages: 12},

        // // groups and calls
        // {groups: 8, ms_call: 0, calls: 6, messages: 10},
        // {groups: 8, ms_call: 0, calls: 5, messages: 11},
        // {groups: 8, ms_call: 0, calls: 4, messages: 12},
        // // {groups: 8, ms_call: 0, calls: 0, messages: 16},
        // {groups: 7, ms_call: 0, calls: 6, messages: 11},
        // {groups: 7, ms_call: 0, calls: 5, messages: 12},
        // {groups: 7, ms_call: 0, calls: 4, messages: 13},
        // // {groups: 7, ms_call: 0, calls: 0, messages: 17},
        // {groups: 6, ms_call: 0, calls: 6, messages: 12},
        // {groups: 6, ms_call: 0, calls: 5, messages: 13},
        // {groups: 6, ms_call: 0, calls: 4, messages: 14},
        // // {groups: 6, ms_call: 0, calls: 0, messages: 18},
        // {groups: 5, ms_call: 0, calls: 6, messages: 13},
        // {groups: 5, ms_call: 0, calls: 5, messages: 14},
        // {groups: 5, ms_call: 0, calls: 4, messages: 15},
        // // {groups: 5, ms_call: 0, calls: 0, messages: 19},
        // {groups: 4, ms_call: 0, calls: 6, messages: 14},
        // {groups: 4, ms_call: 0, calls: 5, messages: 15},
        // {groups: 4, ms_call: 0, calls: 4, messages: 16},
        // // {groups: 4, ms_call: 0, calls: 0, messages: 20},
        // {groups: 0, ms_call: 0, calls: 6, messages: 18},
        // {groups: 0, ms_call: 0, calls: 5, messages: 19},
        // {groups: 0, ms_call: 0, calls: 4, messages: 20},
        // // {groups: 0, ms_call: 0, calls: 0, messages: 24},
        //
        // // ms call present
        // {groups: 0, ms_call: 6, calls: 6, messages: 12},
        // {groups: 0, ms_call: 6, calls: 5, messages: 13},
        // {groups: 0, ms_call: 6, calls: 4, messages: 14},
        // // {groups: 0, ms_call: 6, calls: 0, messages: 18},
        // {groups: 0, ms_call: 5, calls: 6, messages: 13},
        // {groups: 0, ms_call: 5, calls: 5, messages: 14},
        // {groups: 0, ms_call: 5, calls: 4, messages: 15},
        // // {groups: 0, ms_call: 5, calls: 0, messages: 19},
        // {groups: 0, ms_call: 4, calls: 6, messages: 14},
        // {groups: 0, ms_call: 4, calls: 5, messages: 15},
        // {groups: 0, ms_call: 4, calls: 4, messages: 16},
        // // {groups: 0, ms_call: 4, calls: 0, messages: 20},
    ],

    PREV_THREE_WEEK_WEIGHT_CHANGE: {
        CONSISTENT_WEIGHT_GAIN: 'Consistent weight gain',
        CONSISTENT_WEIGHT_LOSS: 'Consistent weight loss',
        MIX_OF_WEIGHT_GAINS_AND_LOSSES_OVERALL_WEIGHT_GAIN: 'Mix of weight gains and losses; overall gain',
        MIX_OF_WEIGHT_GAINS_AND_LOSSES_OVERALL_WEIGHT_LOSS: 'Mix of weight gains and losses; overall loss',
        MIX_OF_WEIGHT_GAINS_AND_LOSSES_OVERALL_WEIGHT_STABLE: 'Mix of weight gains and losses; overall stable',
        ANY: 'any'
    },

    PAST_WEEK_CHANGE: {
        WEIGHT_GAIN: 'Weight gain',
        WEIGHT_LOSS: 'Weight loss',
        WEIGHT_STABLE: 'Weight stable',
        WEIGHT_UNKNOWN: 'Weight is unknown'
    },

    OPERATORS: {
        GREATER: 1,
        LESS_THAN: 2,
        GREATER_THAN_EQUAL: 3,
        LESS_THAN_EQUAL: 4,
        RANGE: 5,
    },

    BEHAVIOR_DOMAIN: {
        PA: 'PA',
        FOOD_TRACKING: 'Food Tracking',
        CALORIES: 'Calories',
        SELF_WEIGHING: 'Self Weighing',
        ANY: 'Any',
        OTHER: 'Other'
    },

    WEIGHT_CRITERION: {
        PAST_WEEK_WEIGHT_CHANGE: 'PAST WEEK WEIGHT CHANGE',
        // PERCENT_PA_GOAL: 'this week PERCENT PA GOAL',
        // FOOD_TRACKING: 'FOOD TRACKING',
        // PERCENT_CALORIES: 'PERCENT CALORIES',
    },

    BEHAVIOUR_DATA_TYPES: {
        DROPDOWN: 'dropdown',
        DROPDOWN1: 'dropdown1',
        CONDITION: 'condition',
        INPUT: 'input',
    },


    BEHAVIOR_CRITERION: {
        FOOD_TRACKING: 'FOOD TRACKING',
        PERCENT_CALORIES: 'PERCENT CALORIES',
        SELF_WEIGH: 'SELF WEIGH',
        PERCENT_PA_GOAL: 'PERCENT PA GOAL',
        MINUTES_MVPA: 'MINUTES MVPA',
        CALORIES: 'CALORIES',
        CALORIE_DAILY_GOAL: 'CALORIE DAILY GOAL',
        PERCENT_CALORIES_WEEKLY_AVERAGE: 'PERCENT CALORIES WEEKLY AVERAGE',
        CALORIE_GOAL_WEEKLY: 'CALORIE GOAL WEEKLY',
        IF_OPENED_THE_APP_AT_LEAST_ONCE: 'If opened the app at least once',
        FOR_THE_FIRST_TIME: 'for the first time',
        IS_HIGHEST_TO_DATE: 'is highest to date',
        INCREASE_EACH_OF_PAST_4_WEEK: 'increased each of past 4 weeks',
        OF_PREVIOUS_3_WEEKS: 'of the previous 3 weeks',
        EACH_WEEK_FOR_THE_PAST_LAST_MONTH: 'each week for the past for last month',
        MINUTES_ON_ANY_DAYS_IN_PAST_WEEK: 'minutes on any days in past week',
        ON_ALL_DAYS_OF_PAST_WEEK: 'on all days of past week',
        THE_AVG_OF_PRIOR_3_WEEKS: 'the average of prior 3 weeks',
        EACH_OF_PRIOR_3_WEEKS: 'each of the prior 3 weeks',
        DAYS_IN_CALORIE_RANGE: 'Days in calorie range',
        DAYS_OVER_CALORIE_RANGE: 'Days over calorie range',
        DAYS_UNDER_CALORIE_RANGE: 'Days under calorie range',
    },


    BEHAVIORAL_MESSAGE_TYPE: {
        STRUGGLING_WITH_GOAL: 'Struggling with goal',
        GOAL_IMPROVING: 'Goal improving',
        GOAL_DECLINING: 'Goal declining',
        GOAL_MAINTENANCE: 'Goal maintenance',
        GENERAL_MOTIVATION: 'General Motivation',
    },

    USER_RESCUE_STATUS: [
        {
            type: 1,
            value: 'OFF'
        },
        {
            type: 2,
            value: 'Pending Coach Approval'
        },
        {
            type: 3,
            value: 'ON'
        },
    ],

    MESSAGE_TYPES: {
        MODULE_MESSAGE: 'Module Message',
        COACHING_MESSAGE: 'Coaching Message',
        COACH_MESSAGE: 'Coach Message',
        REMINDER_MESSAGE: 'Reminder Message',
        SUMMARY_MESSAGE: 'Summary Message',
        WEIGHT_MESSAGE: 'Weight Message',
        BEHAVIOR_MESSAGE: 'Behavior Message',
        RESCUE_MESSAGE: 'Rescue Message',
        REPLY_MESSAGE: 'Reply Message',
        MVPA_GOAL_MESSAGE: 'MVPA Goal',
    },

    MESSAGE_BANK: {
        MESSAGE_BANK_A: 'Message Bank A',
        MESSAGE_BANK_B: 'Message Bank B',
        MESSAGE_BANK_C: 'Message Bank C',
        MESSAGE_BANK_D: 'Message Bank D',
        MESSAGE_BANK_E: 'Message Bank E',
        SPECIAL_MESSAGE_BANK: 'Special Message Bank',
    },

    RESCUE_MESSAGE_CONTINGENCY: {
        WEEK_NUMBER: 1,
        MVPA: 2,
        NO_CONTIGENCY: 3,
        APP_OPENED: 4,
        GOAL_MET_DAYS: 5,
        GREATER_THAN_PRIOR_WEEK: 6,
    },

    MEAL_TYPES: {
        'Breakfast': 1,
        'Morning Snacks': 2,
        'Lunch': 3,
        'Afternoon Snacks': 4,
        'Dinner': 5,
        'Evening Snacks': 6,
        'Anytime': 7,
    },

    MEAL_TYPES_ARRAY: ['', 'Breakfast', 'Morning Snacks', 'Lunch', 'Afternoon Snacks', 'Dinner', 'Evening Snacks', 'Anytime'],

    WEEK_MVPA_TABLE: {
        WEEK_0: 0,
        WEEK_1: 30,
        WEEK_2: 45,
        WEEK_3: 60,
        WEEK_4: 80,
        WEEK_5: 100,
        WEEK_6: 120,
        WEEK_7: 150,
        WEEK_8: 175,
        WEEK_9: 200,
        WEEK_10: 250,
    },

    OTHER_STRINGS: {
        YOUR_WEEKLY_SUMMARY: 'Your Weekly Summary',
        CHECK_SUMMARY_IN_APP: 'Please check your summary in app',
        MAX_WEEKS: 52,
    },

    MESSAGE_STATUS_ENUM: {
        DELIVERED: 'DELIVERED',
        READ: 'READ'
    },

    FITBIT_CONSTS: {
        BASE_URL: 'https://api.fitbit.com/1/user/-',
        BASE_URL_1_2: 'https://api.fitbit.com/1.2/user/-',
        CHECK_SUMMARY_IN_APP: 'Please check your summary in app',
    },
    RELEARN: {
        EMAIL_RELEARN: 'relearn@drexel.edu',
    }
}
