// spec.js
describe('Todo MVC Angular App', function() {
  var textElement;
  
  beforeAll(function() {
    browser.get('http://todomvc.com/examples/angular2/');
    textElement = element(by.className('new-todo')).getText();
  });
  
  ////////////////////////////////////////////////////////////////  
  it('Create a todo', function() {
    var itemText = 'First';
    textElement.sendKeys(itemText);
    textElement.sendKeys(protractor.Key.ENTER);
    var list = element.all(by.className('view'));
    expect(list.get(0).getText()).toBe(itemText);
  });

  ////////////////////////////////////////////////////////////////  
  it('Delete with x', function() {
    // Select the first todo so the x appears
    var list = element.all(by.className('view'));
    list.get(0).click();

    // Click the x for the first todo
    var list = element.all(by.className('destroy'));
    list.get(0).click();
  });

  ////////////////////////////////////////////////////////////////  
  it('Check completed', function() {
    // Create a new todo
    var itemText = 'First';
    textElement.sendKeys(itemText);
    textElement.sendKeys(protractor.Key.ENTER);

    // Mark the todo complete
    var list = element.all(by.className('toggle'));
    var todoToggle = list.get(0);
    todoToggle.click();
    expect(todoToggle.isSelected()).toBe(true);
  });

  ////////////////////////////////////////////////////////////////  
  it('Uncheck completed', function() {
    // Clear the todo complete
    var list = element.all(by.className('toggle'));
    var todoToggle = list.get(0);
    todoToggle.click();
    expect(todoToggle.isSelected()).toBe(false);
  });

  ////////////////////////////////////////////////////////////////  
  it('Delete with clear completed', function() {
    // Mark the todo complete
    var list = element.all(by.className('toggle'));
    var todoToggle = list.get(0);
    todoToggle.click();

    // Click clear completed and verify
    clearBtn = element(by.className('clear-completed'));
    clearBtn.click();
    var list = element.all(by.className('view'));
    expect(list.count()).toBe(0);
  });

  ////////////////////////////////////////////////////////////////  
  it('Refresh with todo items', function() {
    // Create some new todos
    textElement.sendKeys('one');
    textElement.sendKeys(protractor.Key.ENTER);
    textElement.sendKeys('two');
    textElement.sendKeys(protractor.Key.ENTER);
    textElement.sendKeys('three');
    textElement.sendKeys(protractor.Key.ENTER);

    // Refresh the browser and check the todo count    
    browser.refresh();
    var list = element.all(by.className('view'));
    expect(list.count()).toBe(3);
  });

  ////////////////////////////////////////////////////////////////  
  it('Refresh after delete', function() {
    // Select the first todo so the x appears
    var list = element.all(by.className('view'));
    list.get(0).click();

    // Click the x for the first todo
    var list = element.all(by.className('destroy'));
    list.get(0).click();

    // Refresh the browser and check the todo count    
    browser.refresh();
    var list = element.all(by.className('view'));
    expect(list.count()).toBe(2);
  });

  ////////////////////////////////////////////////////////////////  
  it('Mark all completed', function() {
    // Check all todos
    var list = element.all(by.className('toggle-all'));
    list.get(0).click();

    var list = element.all(by.className('toggle'));
    expect(list.get(0).isSelected()).toBe(true);
    expect(list.get(1).isSelected()).toBe(true);

    // Uncheck all
    var list = element.all(by.className('toggle-all'));
    list.get(0).click();
    
    var list = element.all(by.className('toggle'));
    expect(list.get(0).isSelected()).toBe(false);
    expect(list.get(1).isSelected()).toBe(false);
  });

  ////////////////////////////////////////////////////////////////  
  it('Edit a todo item', function() {
    // Doubleclick the first todo
    var list = element.all(by.className('view'));
    browser.actions().doubleClick(list.get(0)).perform();

    // Confirm it's in edit mode
    var list = element.all(by.className('edit'));
    expect(list.count()).toBe(1);
    
    // Update the text and confirm it worked
    editText = list.get(0).getText();
    editText.sendKeys('more');
    editText.sendKeys(protractor.Key.ENTER);
    var list = element.all(by.className('view'));
    expect(list.get(0).getText()).toBe('twomore');
  });

  ////////////////////////////////////////////////////////////////
  it('Clear all items', function() {  
    // Check all todos
    var list = element.all(by.className('toggle-all'));
    list.get(0).click();
    // Click clear completed and verify
    clearBtn = element(by.className('clear-completed'));
    clearBtn.click();
    var list = element.all(by.className('view'));
    expect(list.count()).toBe(0);
  });    
    
  ////////////////////////////////////////////////////////////////
  it('Check add todo order', function() {
    // Create some todos
    textElement.sendKeys('one');
    textElement.sendKeys(protractor.Key.ENTER);
    textElement.sendKeys('two');
    textElement.sendKeys(protractor.Key.ENTER);

    // Confirm the order is last on bottom
    var list = element.all(by.className('view'));
    expect(list.get(0).getText()).toBe('one');
    expect(list.get(1).getText()).toBe('two');
  });
  
  ////////////////////////////////////////////////////////////////  
  it('Create 1000 todos', function() {
    var loopCount = 10;
    for (var i = 0; i < loopCount; ++i) {
      textElement.sendKeys(loopCount.toString());
      textElement.sendKeys(protractor.Key.ENTER);
    }
    var list = element.all(by.className('view'));
    expect(list.count()).toBe(loopCount + 2);
  });
});


