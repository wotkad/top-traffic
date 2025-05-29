// #################################

// Разработано на: RISE PROJECT
// Разработчик: WOTKAD
// Сайт: WOTKAD.RU
// Сайт проекта: WOTKAD.RU/RISE

// #################################

import setAsideHeight from "./base/common/set-aside-height";

window.addEventListener('load', function() {
  setAsideHeight();

  this.setTimeout(function() {
    setAsideHeight();
  }, 400);
});

import "./base/common/preloader";
import "./base/common/load-images";
import "./base/common/smooth-scroll";
import "./base/common/get-current-year";
import "./base/common/set-svg-size";
import "./base/common/get-header-height";
import "./base/common/set-filter-height";
import "./base/common/set-aside-height";
import "./base/common/set-filter-position";
import "./base/common/set-aside-position";
import "./base/common/set-subrow-position";
import "./base/common/set-td-padding";
import "./base/common/set-page-initials";
import "./base/common/set-profile-initials";
import "./base/common/set-profile-photo";
import "./base/common/set-comment-initials";
import "./base/common/set-chat-initials";
import "./base/common/copy-accordion-link";
import "./base/common/copy-users-link";
import "./base/common/copy-popup-link";
import "./base/common/table-attachment-link";
import "./base/common/table-attachment-file";
import "./base/common/table-attachment-bill";
import "./base/common/aside-attachment-link";
import "./base/common/aside-attachment-file";
import "./base/common/messages";
import "./base/common/messages/send-edit";
import "./base/common/messages/send-message";
import "./base/common/messages/send-reply";
import "./base/common/messages/open-edit";
import "./base/common/messages/open-reply";
import "./base/common/only-numbers";
import "./base/common/users";
import "./base/common/add-user";
import "./base/common/set-info-user-pos";

import "./base/common/chat";
import "./base/common/chat/send-edit";
import "./base/common/chat/send-message";
import "./base/common/chat/send-reply";
import "./base/common/chat/open-edit";
import "./base/common/chat/open-reply";
import "./base/common/chat/search";

import "./components/form/form-login";

import "./components/validator/validator-email";
import "./components/validator/validator-input";
import "./components/validator/validator-password";

import "./components/toggle/toggle-password";
import "./components/toggle/toggle-aside";
import "./components/toggle/toggle-aside-menu";
import "./components/toggle/toggle-dropdown";
import "./components/toggle/toggle-filter";
import "./components/toggle/toggle-filter-sort";
import "./components/toggle/toggle-filter-aside-feed";
import "./components/toggle/toggle-channels";
import "./components/toggle/toggle-popup";
import "./components/toggle/toggle-selector";
import "./components/toggle/toggle-accordion";
import "./components/toggle/toggle-accordion-item";
import "./components/toggle/toggle-table-admin-input";
import "./components/toggle/toggle-table-channel-input";
import "./components/toggle/toggle-widget";
import "./components/toggle/toggle-table-input-width";
import "./components/toggle/toggle-table-selected";
import "./components/toggle/toggle-subrow";
import "./components/toggle/toggle-input-clear";
import "./components/toggle/toggle-favorites";
import "./components/toggle/toggle-confirm";
import "./components/toggle/toggle-chat-categories";
import "./components/toggle/toggle-pinned-state";
import "./components/toggle/toggle-chat-search";
import "./components/toggle/toggle-chat-channel";

import "./components/scroll/scroll-to-top";
import "./components/scroll/scroll-filter";
import "./components/scroll/scroll-content-aside";
import "./components/scroll/scroll-table";

import "./components/datepicker";
import "./components/monthpicker";