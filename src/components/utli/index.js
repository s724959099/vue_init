/**
 * Created by Admin on 2017/7/20.
 */
import datetimepicker from "./datetimepicker"
import mSelect from "./select"
import modal from "./modal"
import datePicker from "./date_picker"
import onlyModal from "./only_modal"
import modalDatePicker from "./modal_date_picker"
import mTable from "@/components/utli/table"
import mFullScreen from "@/components/utli/full_screen"
import mNotice from "@/components/utli/notice"
const Components = {
  datetimepicker,
  mSelect,
  modal,
  datePicker,
  onlyModal,
  modalDatePicker,
  mTable,
  mFullScreen,
  mNotice,
}

function install(Vue) {
  Object.keys(Components).forEach(key => {
    Vue.component(`${key}`, Components[key])
  })

}

export default install
