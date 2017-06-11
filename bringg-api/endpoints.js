var produceTypeConverter = require('./type-converter');

module.exports = {
  customers: {
    path: 'customers',
    postParams: {
      'name'                : produceTypeConverter('string'),
      'company_id'          : produceTypeConverter('int32'),
      'address'             : produceTypeConverter('string'),
      'address_second_line' : produceTypeConverter('string'),
      'phone'               : produceTypeConverter('string'),
      'email'               : produceTypeConverter('string'),
      'lat'                 : produceTypeConverter('double'),
      'lng'                 : produceTypeConverter('double'),
      'external_id'         : produceTypeConverter('string'),
      'allow_login'         : produceTypeConverter('boolean'),
      'confirmation_code'   : produceTypeConverter('string'),
      'allow_sending_email' : produceTypeConverter('boolean'),
      'allow_sending_sms'   : produceTypeConverter('boolean')
    },
    respBodyName: 'customer'
  },
  tasks: {
    path: 'tasks',
    getParams: {
      'company_id' : produceTypeConverter('int32'),
      'page'       : produceTypeConverter('int32')
    },
    postParams: {
      'customer_id'         : produceTypeConverter('int32'),
      'company_id'          : produceTypeConverter('int32'),
      'user_id'             : produceTypeConverter('int32'),
      'title'               : produceTypeConverter('string'),
      'team_id'             : produceTypeConverter('int32'),
      'silent'              : produceTypeConverter('boolean'),
      'note'                : produceTypeConverter('string'),
      'formatted_note'      : produceTypeConverter('string'),
      'scheduled_at'        : produceTypeConverter('string'),
      'asap'                : produceTypeConverter('boolean'),
      'lat'                 : produceTypeConverter('double'),
      'lng'                 : produceTypeConverter('double'),
      'address'             : produceTypeConverter('string'),
      'address_second_line' : produceTypeConverter('string'),
      'extras'              : produceTypeConverter(),
      'external_id'         : produceTypeConverter('string'),
      'place_id'            : produceTypeConverter('int32'),
      'total_price'         : produceTypeConverter('double'),
      'left_to_be_paid'     : produceTypeConverter('double'),
      'delivery_price'      : produceTypeConverter('double'),
      'priority'            : produceTypeConverter('int32'),
      'price_before_tax'    : produceTypeConverter('double'),
      'tax_price'           : produceTypeConverter('double'),
      'inventory'           : produceTypeConverter('array of mixed types'),
      'anonymous'           : produceTypeConverter('boolean'),
      'share_location'      : produceTypeConverter('boolean'),
      'tag_id'              : produceTypeConverter('int32'),
      'task_type'           : produceTypeConverter('int32')
    },
    respBodyName: 'task'
  }
};
