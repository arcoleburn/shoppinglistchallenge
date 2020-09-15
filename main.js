/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable strict */

function main() {
  $('#js-shopping-list-form').submit((event) => {
    event.preventDefault();
    console.log('A button was clicked')
     let listItem = $('#shopping-list-entry').val();
  console.log('item detected', listItem);

  let template = `<li>
  <span class="shopping-item">${listItem}</span>
  <div class="shopping-item-controls">
    <button class="shopping-item-toggle">
      <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete">
      <span class="button-label">delete</span>
    </button>
  </div>
</li>`;

  $('.shopping-list').append(template);;
  });

 

  $('.shopping-list').on('click', '.shopping-item-toggle', function(evt){
    let title=$(this).parent().siblings('span');
    console.log(title);
    title.toggleClass('shopping-item__checked');
  });

  $('.shopping-list').on('click', '.shopping-item-delete', function(evt){
    $(this).parent().parent().remove();
  });

}

$(main);
