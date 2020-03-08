export class AppConstants {
    // swagger constants
    static SWAGGER_DOC_TITLE = 'Construmart API';
    static SWAGGER_DOC_DESCRIPTION = 'Documentation for Construmart web service';
    static SWAGGER_API_VERSION = '1.0';
    static SWAGGER_ADMIN_TAG = 'Construmart Admin';
    static SWAGGER_ADMIN_TAG_DESCRIPTION = 'These are documented endpoints specific to the administrative role of the service';
    static SWAGGER_CUSTOMER_TAG = 'Construmart Customer';
    static SWAGGER_CUSTOMER_TAG_DESCRIPTION = 'These are documented endpoints specific to the customer role of the service';
    static APP_BASE_URL = 'api/v1/';
    static SWAGGER_500_DESCRIPTION = 'Something went wrong internally...please contact support';
    static SWAGGER_200_DESCRIPTION = 'Request completed sucessfully';
    static SWAGGER_201_DESCRIPTION = 'Created sucessfully';
    static SWAGGER_400_DESCRIPTION = 'Invalid request payload';
    static SWAGGER_422_DESCRIPTION = 'An error occured while creating category';
    static SWAGGER_304_DESCRIPTION = 'Failed to update data';
    static SWAGGER_404_DESCRIPTION = 'Data does not exist';

    static ORDER_ASC = 'ASC';
    static ORDER_DESC = 'DESC';

    //http urls
    static ELASTIC_EMAIL_URL = 'api.elasticemail.com/mailer/send';
    static ELASTIC_EMAIL_SMTP_HOST = 'smtp.elasticemail.com';
    static ELASTIC_EMAIL_PORT = '2525';
    static ELASTIC_EMAIL_USERNAME = 'construmart@email.com';
}
