# adapt-homeButton

**Home Button** is an extension that adds more control to the standard home and back buttons.

## Settings Overview

**Home Button** can be configured based on the specific location where it is used (e.g. a menu or a page). Options include:
- Hiding either the home and/or back button. One or both can appear in the navigation at the same time.
- Changing the text of the buttons
- Redirecting the button to a specific location (e.g. an introductory page)

## Attributes

All configuration options must be added and amended, where appropriate, for all JSON files.

### *config.json*
The following attributes are set within *config.json*.

### **\_homeButton** (object):
The Home Button object contains the following settings:

#### **\_isEnabled** (boolean):
Controls whether the Home Button extension is enabled

### *course.json*
The following attributes are set within *course.json*. These are used to set some default settings and the navigation order:

### **\_homeButton** (object):
The Home Button object contains the following settings:

#### **_navOrder** (number):
The order that the button appears in the navigation

#### **_showLabel** (boolean):
Controls whether the button should use a navigation label or just an icon

#### **alt** (string):
The button's `aria-label` text. Used to override global setting

#### **navLabel** (string):
The button label text as it appears in the navigation

#### **_navTooltip** (object):
The Navigation Tooltip object contains the following settings:

##### **\_isEnabled** (boolean):
Controls whether the navigation tooltip is enabled

##### **text** (string):
The text of the tooltip. Used to override global setting

### *course.json / contentObjects.json*
The following attributes are set within *course.json* and/or *contentObjects.json*. These are used to *override* global settings and customize the button for a specific page or menu.

### **\_homeButton** (object):
The Home Button object contains the following settings:

#### **\_isEnabled** (boolean):
Controls whether the Home Button extension is enabled

#### **\_hideHomeButton** (boolean):
Controls whether the home button is hidden or not

#### **\_hideBackButton** (boolean):
Controls whether the back button is hidden or not

#### **\_redirectToId** (string):
The page ID that the home button should redirect the user to. Use when overriding standard behaviour such as redirecting to an introductory page from the menu.

#### **alt** (string):
The button's `aria-label` text. Used to override global setting

#### **navLabel** (string):
The button label text as it appears in the navigation. Used to override global setting

#### **_navTooltip** (object):
The Navigation Tooltip object contains the following settings:

##### **\_isEnabled** (boolean):
Controls whether the navigation tooltip is enabled. Used to override global setting

##### **text** (string):
The text of the tooltip. Used to override global setting

## Limitations

No known limitations.

----------------------------

**Framework versions:**  5.30.3+<br>
**Author / maintainer:**  CGKineo<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 12+13 for macOS/iOS/iPadOS, Opera<br>
