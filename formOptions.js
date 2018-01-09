import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;
import moment from 'moment';

let myFormatFunction = (format, date) =>{
    return moment(date).format(format);
}

var options = {
  fields: {
    name: {
      label: 'Name' // <= label for the name field
    },
    desc: {
        label: 'Description',
        multiline: true,
        numberOfLines: 5,
        stylesheet: {
        ...Form.stylesheet,
        textbox: {
            ...Form.stylesheet.textbox,
            normal: {
              ...Form.stylesheet.textbox.normal,
                height: 130,
            }}
        }
    },
    date: {
      label: 'When',
      mode: "datetime",
      config:{
//          format:(datetime) => myFormatFunction("DD MMM YYYY hh", datetime)
            format:(datetime) => myFormatFunction("HH:mm", datetime),
            dialogMode: "spinner",
            is24Hour: false,
            timeFormat: (datetime) => myFormatFunction("hh:mm a", datetime),
            dateFormat: (datetime) => myFormatFunction("ddd, DD MMM YYYY", datetime)
      },
      stylesheet: {
          ...Form.stylesheet,
          dateValue: {
              ...Form.stylesheet.dateValue,
              normal: {
                ...Form.stylesheet.dateValue.normal,
                  borderColor : '#d0d2d3',
                  backgroundColor : '#f0f1f1',
                  borderWidth: 1
              }
          }
      }
    },
    location:{
        label: "Where"
    }
  }
};

export default options;