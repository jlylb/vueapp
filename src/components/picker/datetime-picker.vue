<script>
import { DatetimePicker } from "mint-ui";
import MyPicker from "./picker.vue";
export default {
  extends: DatetimePicker,
  components: {
    "mt-picker": MyPicker
  }
};
</script>

<style>
</style>
