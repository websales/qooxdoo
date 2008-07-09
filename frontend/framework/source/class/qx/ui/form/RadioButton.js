/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * Radio buttons can be used in radio groups to allow to the user to select
 * exactly one item from a list. Radio groups are established by adding
 * radio buttons to a radio manager {@link qx.ui.form.RadioGroup}.
 *
 * Example:
 * <pre class="javascript">
 *   var female = new qx.ui.form.RadioButton("female");
 *   var male = new qx.ui.form.RadioButton("male");
 *
 *   var mgr = new qx.ui.form.RadioGroup();
 *   mgr.add(female, male);
 *
 *   layout.add(male);
 *   layout.add(female);
 * </pre>
 *
 * @appearance radiobutton
 * @state checked
 */
qx.Class.define("qx.ui.form.RadioButton",
{
  extend : qx.ui.form.Button,
  implement : qx.ui.form.IRadioItem,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String?null} An optional label for the radio button.
   */
  construct : function(label)
  {
    if (qx.core.Variant.isSet("qx.debug", "on")) {
      this.assertArgumentsCount(arguments, 0, 1);
    }

    this.base(arguments, label);

    // Add listeners
    this.addListener("execute", this._onexecute);
    this.addListener("keypress", this._onkeypress);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** The assigned qx.ui.form.RadioGroup which handles the switching between registered buttons */
    group :
    {
      check  : "qx.ui.form.RadioGroup",
      nullable : true,
      apply : "_applyGroup"
    },

    /** Boolean value signals if the button is checked */
    checked:
    {
      check: "Boolean",
      init: false,
      apply: "_applyChecked",
      event: "changeChecked"
    },

    // overridden
    appearance :
    {
      refine : true,
      init : "radiobutton"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    isTabable : function() {
      return this.isFocusable() && this.isChecked();
    },




    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyChecked : function(value, old)
    {
      value ?
        this.addState("checked") :
        this.removeState("checked");
    },


    // property apply
    _applyGroup : function(value, old)
    {
      if (old) {
        old.remove(this);
      }

      if (value) {
        value.add(this);
      }
    },




    /*
    ---------------------------------------------------------------------------
      EVENT-HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * Event listener for the "execute" event.
     *
     * Sets the property "checked" to true.
     *
     * @type member
     * @param e {qx.event.type.Event} execute event
     * @return {void}
     */
    _onexecute : function(e) {
      this.setChecked(true);
    },


    /**
     * Event listener for the "keyPress" event.
     *
     * Selects the previous RadioButton when pressing "Left" or "Up" and
     * Selects the next RadioButton when pressing "Right" and "Down"
     *
     * @type member
     * @param e {qx.event.type.KeySequence} KeyPress event
     * @return {void}
     */
    _onkeypress : function(e)
    {
      var mgr = this.getManager();
      if (!mgr) {
        return;
      }

      switch(e.getKeyIdentifier())
      {
        case "Left":
        case "Up":
          mgr.selectPrevious(this);

        case "Right":
        case "Down":
          mgr.selectNext(this);
      }
    }
  }
});
